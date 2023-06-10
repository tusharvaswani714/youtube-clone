import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import useFeedStore from "../../../Zustand/feed";
import getFeed from "../../../DataFetchers/Feed/get";
import FeedCard from "./FeedCard/FeedCard";
import {
    FetchedFeed,
    Feed as FeedInterface,
    FetchedChannelDetail,
} from "../../../config/interfaces";
import getChannelsDetailsByIds from "../../../DataFetchers/Channels/getByIds.ts";
import FeedCardSkeleton from "./FeedCardSkeleton/FeedCardSkeleton";
import InfiniteScroll from "react-infinite-scroller";

const Feed = () => {
    const selectedCategory = useFeedStore((state) => state.selectedCategory);
    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ["feed", selectedCategory],
            queryFn: async ({ pageParam }) => {
                const getFeedResponse = await getFeed({
                    categoryId: selectedCategory,
                    nextPageToken: pageParam,
                });
                const fetchedFeed = getFeedResponse.data.items;
                const channelIds: string[] = [];
                let feedData: FeedInterface[] = fetchedFeed.map(
                    (feedItem: FetchedFeed) => {
                        channelIds.push(feedItem.snippet.channelId);
                        return {
                            id: feedItem.id,
                            title: feedItem.snippet.title,
                            publishedAt: feedItem.snippet.publishedAt,
                            channel: {
                                id: feedItem.snippet.channelId,
                                title: feedItem.snippet.channelTitle,
                                thumbnail: "",
                            },
                            duration: feedItem.contentDetails.duration,
                            thumbnail: feedItem.snippet.thumbnails.standard.url,
                            views: feedItem.statistics.viewCount,
                        };
                    }
                );
                const getChannelDetailsByIdsResponse =
                    await getChannelsDetailsByIds({
                        channelIds,
                    });
                const channelDetails: FetchedChannelDetail[] =
                    getChannelDetailsByIdsResponse.data.items;
                feedData = feedData.map((feed) => {
                    const channel = channelDetails.find(
                        (channel) => channel.id === feed.channel.id
                    );
                    return {
                        ...feed,
                        channel: {
                            ...feed.channel,
                            thumbnail:
                                channel &&
                                channel.snippet.thumbnails.default.url,
                        },
                    };
                });
                return {
                    feedItems: feedData,
                    nextPageToken: getFeedResponse.data.nextPageToken,
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
            loader={
                <>
                    {(isFetching || isFetchingNextPage) &&
                        new Array(12)
                            .fill(0)
                            .map((_, index) => (
                                <FeedCardSkeleton key={index} />
                            ))}
                </>
            }
        >
            {data?.pages.map((feedPage, index) => (
                <React.Fragment key={index}>
                    {feedPage.feedItems.map((feedItem, index) => (
                        <FeedCard key={index} {...feedItem} />
                    ))}
                </React.Fragment>
            ))}
        </InfiniteScroll>
    );
};

export default Feed;
