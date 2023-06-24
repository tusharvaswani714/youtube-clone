import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import useChannelDetailsStore from "../../../Zustand/channelDetails";
import getSearchResults from "../../../DataFetchers/Search/getResults";
import {
    FetchedSearchResult,
    SearchResult,
    SearchResultFetchedVideoDetails,
} from "../../../config/interfaces";
import getVideoDetailsByIds from "../../../DataFetchers/Videos/getByIds";
import InfiniteScroll from "react-infinite-scroller";
import VideoCard from "../../Global/VideoCard/VideoCard";
import VideoCardSkeleton from "../../Global/VideoCardSkeleton/VideoCardSkeleton";

const ChannelVideos = () => {
    const channelId = useChannelDetailsStore(
        (state) => state.channelDetails?.id
    );
    const thumbnail = useChannelDetailsStore(
        (state) => state.channelDetails?.profileURL
    );
    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ["videoRecommendations", channelId],
            enabled: !!channelId,
            queryFn: async ({ pageParam }) => {
                const getSearchResultsResponse = await getSearchResults({
                    channelId,
                    nextPageToken: pageParam,
                    order: "date",
                });
                const searchResults = getSearchResultsResponse.data.items;
                const channelIds: string[] = [];
                const videoIds: string[] = [];
                let searchResultsData: SearchResult[] = searchResults.map(
                    (searchResult: FetchedSearchResult) => {
                        channelIds.push(searchResult.snippet.channelId);
                        videoIds.push(searchResult.id.videoId);

                        const thumbnails = searchResult.snippet.thumbnails;
                        let maxResolutionImageURL = null,
                            maxResolution = 0;
                        for (const resolutionKey in thumbnails) {
                            const image = thumbnails[resolutionKey];
                            const resolution = image.width * image.height;

                            if (resolution > maxResolution) {
                                maxResolution = resolution;
                                maxResolutionImageURL = image.url;
                            }
                        }
                        return {
                            id: searchResult.id.videoId,
                            title: searchResult.snippet.title,
                            desc: searchResult.snippet.description,
                            publishedAt: searchResult.snippet.publishedAt,
                            channel: {
                                id: searchResult.snippet.channelId,
                                title: searchResult.snippet.channelTitle,
                                thumbnail: "",
                            },
                            duration: "",
                            thumbnail: maxResolutionImageURL,
                            views: 0,
                        };
                    }
                );
                const getVideoDetailsByIdsResponse = await getVideoDetailsByIds(
                    {
                        videoIds,
                        part: ["statistics", "contentDetails"],
                    }
                );
                const videoDetails: SearchResultFetchedVideoDetails[] =
                    getVideoDetailsByIdsResponse.data.items;
                searchResultsData = searchResultsData.map(
                    (searchResultItem) => {
                        const video = videoDetails.find(
                            (video) => video.id === searchResultItem.id
                        );
                        return {
                            ...searchResultItem,
                            channel: {
                                ...searchResultItem.channel,
                                thumbnail,
                            },
                            duration: video
                                ? video.contentDetails.duration
                                : "",
                            views: video
                                ? Number(video.statistics.viewCount)
                                : 0,
                        };
                    }
                );
                return {
                    searchResults: searchResultsData,
                    nextPageToken: getSearchResultsResponse.data.nextPageToken,
                };
            },
            refetchOnWindowFocus: false,
            getNextPageParam: (lastPage) => lastPage.nextPageToken,
        });
    return (
        <InfiniteScroll
            className="max-w-[240rem] m-auto flex justify-center px-10 py-[1.2rem] flex-wrap gap-x-[1.6rem] gap-y-16"
            loadMore={() => fetchNextPage()}
            hasMore={hasNextPage}
            threshold={10}
        >
            {data?.pages.map((searchResultsPage, index) => (
                <React.Fragment key={index}>
                    {searchResultsPage?.searchResults.map(
                        (searchResultItem, index) => (
                            <VideoCard key={index} {...searchResultItem} />
                        )
                    )}
                </React.Fragment>
            ))}
            {(isFetching || isFetchingNextPage) &&
                new Array(12)
                    .fill(0)
                    .map((_, index) => <VideoCardSkeleton key={index} />)}
        </InfiniteScroll>
    );
};

export default ChannelVideos;
