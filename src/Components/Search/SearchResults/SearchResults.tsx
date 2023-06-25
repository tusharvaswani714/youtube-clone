import { useInfiniteQuery } from "@tanstack/react-query";
import SearchResultCard from "./SearchResultCard/SearchResultCard";
import SearchResultCardSkeleton from "./SearchResultCardSkeleton/SearchResultCardSkeleton";
import getSearchResults from "../../../DataFetchers/Search/getResults";
import { useSearchParams } from "react-router-dom";
import {
    FetchedChannelDetails,
    FetchedVideoDetails,
    FetchedSearchResult,
    SearchResult,
} from "../../../config/interfaces";
import getChannelsDetailsByIds from "../../../DataFetchers/Channels/getByIds";
import getVideoDetailsByIds from "../../../DataFetchers/Videos/getByIds";
import InfiniteScroll from "react-infinite-scroller";
import React from "react";
import getMaxResolutionImage from "../../../lib/getMaxResolutionImage";

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q");
    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ["search", searchQuery],
            queryFn: async ({ pageParam }) => {
                if (searchQuery) {
                    const getSearchResultsResponse = await getSearchResults({
                        searchQuery,
                        nextPageToken: pageParam,
                    });
                    const fetchedSearchResults: FetchedSearchResult[] =
                        getSearchResultsResponse.data.items;
                    const channelIds: string[] = [];
                    const videoIds: string[] = [];
                    let searchResults: SearchResult[] =
                        fetchedSearchResults.map((fetchedSearchResult) => {
                            channelIds.push(
                                fetchedSearchResult.snippet.channelId
                            );
                            videoIds.push(fetchedSearchResult.id.videoId);
                            const thumbnails =
                                fetchedSearchResult.snippet.thumbnails;
                            const { maxResolutionImageURL } =
                                getMaxResolutionImage(thumbnails);
                            return {
                                id: fetchedSearchResult.id.videoId,
                                title: fetchedSearchResult.snippet.title,
                                desc: fetchedSearchResult.snippet.description,
                                publishedAt:
                                    fetchedSearchResult.snippet.publishedAt,
                                channel: {
                                    id: fetchedSearchResult.snippet.channelId,
                                    title: fetchedSearchResult.snippet
                                        .channelTitle,
                                    thumbnail: "",
                                },
                                duration: "",
                                thumbnail: maxResolutionImageURL as string,
                                views: 0,
                            };
                        });
                    const getChannelDetailsByIdsResponse =
                        await getChannelsDetailsByIds({
                            channelIds,
                            part: ["snippet"],
                        });
                    const channelDetails: FetchedChannelDetails[] =
                        getChannelDetailsByIdsResponse.data.items;
                    const getVideoDetailsByIdsResponse =
                        await getVideoDetailsByIds({
                            videoIds,
                            part: ["statistics", "contentDetails"],
                        });
                    const videoDetails: FetchedVideoDetails[] =
                        getVideoDetailsByIdsResponse.data.items;
                    searchResults = searchResults.map((searchResult) => {
                        const channel = channelDetails.find(
                            (channel) => channel.id === searchResult.channel.id
                        );
                        const video = videoDetails.find(
                            (video) => video.id === searchResult.id
                        );
                        return {
                            ...searchResult,
                            channel: {
                                ...searchResult.channel,
                                thumbnail:
                                    channel &&
                                    channel.snippet.thumbnails.default.url,
                            },
                            duration: video
                                ? video.contentDetails.duration
                                : "",
                            views: video
                                ? Number(video.statistics.viewCount)
                                : 0,
                        };
                    });
                    return {
                        searchResults,
                        nextPageToken:
                            getSearchResultsResponse.data.nextPageToken,
                    };
                }
            },
            refetchOnWindowFocus: false,
            getNextPageParam: (lastPage) => lastPage?.nextPageToken,
        });
    return (
        <InfiniteScroll
            className="max-w-[100rem] m-auto py-[1.6rem] px-10 flex flex-col gap-[1.6rem]"
            loadMore={() => fetchNextPage()}
            hasMore={hasNextPage}
            threshold={10}
        >
            {data?.pages.map((searchResultsPage, index) => (
                <React.Fragment key={index}>
                    {searchResultsPage?.searchResults.map(
                        (searchResultItem, index) => (
                            <SearchResultCard
                                key={index}
                                {...searchResultItem}
                            />
                        )
                    )}
                </React.Fragment>
            ))}
            {(isFetching || isFetchingNextPage) &&
                new Array(12)
                    .fill(0)
                    .map((_, index) => (
                        <SearchResultCardSkeleton key={index} />
                    ))}
        </InfiniteScroll>
    );
};

export default SearchResults;
