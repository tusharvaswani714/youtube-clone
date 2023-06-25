import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import useChannelDetailsStore from "../../../Zustand/channelDetails";
import getSearchResults from "../../../DataFetchers/Search/getResults";
import {
    FetchedSearchResult,
    FetchedVideoDetails,
    SearchResult,
} from "../../../config/interfaces";
import getVideoDetailsByIds from "../../../DataFetchers/Videos/getByIds";
import InfiniteScroll from "react-infinite-scroller";
import VideoCard from "../../Global/VideoCard/VideoCard";
import VideoCardSkeleton from "../../Global/VideoCardSkeleton/VideoCardSkeleton";
import getMaxResolutionImage from "../../../lib/getMaxResolutionImage";

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
                const videoIds: string[] = [];
                let channelVideos: SearchResult[] = searchResults.map(
                    (searchResult: FetchedSearchResult) => {
                        videoIds.push(searchResult.id.videoId);
                        const thumbnails = searchResult.snippet.thumbnails;
                        const { maxResolutionImageURL } =
                            getMaxResolutionImage(thumbnails);
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
                const videoDetails: FetchedVideoDetails[] =
                    getVideoDetailsByIdsResponse.data.items;
                channelVideos = channelVideos.map((searchResultItem) => {
                    const video = videoDetails.find(
                        (video) => video.id === searchResultItem.id
                    );
                    return {
                        ...searchResultItem,
                        channel: {
                            ...searchResultItem.channel,
                            thumbnail,
                        },
                        duration: video ? video.contentDetails.duration : "",
                        views: video ? Number(video.statistics.viewCount) : 0,
                    };
                });
                return {
                    channelVideos,
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
            {data?.pages.map((channelVideosResultsPage, index) => (
                <React.Fragment key={index}>
                    {channelVideosResultsPage?.channelVideos.map(
                        (channelVideo, index) => (
                            <VideoCard key={index} {...channelVideo} />
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
