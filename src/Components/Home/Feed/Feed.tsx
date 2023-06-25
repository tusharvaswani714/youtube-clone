import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import useFeedStore from "../../../Zustand/feed";
import getVideos from "../../../DataFetchers/Videos/get.ts";
import FeedCard from "../../Global/VideoCard/VideoCard.tsx";
import {
    FetchedVideoDetails,
    VideoCard as FeedInterface,
    FetchedChannelDetails,
} from "../../../config/interfaces";
import getChannelsDetailsByIds from "../../../DataFetchers/Channels/getByIds.ts";
import FeedCardSkeleton from "../../Global/VideoCardSkeleton/VideoCardSkeleton";
import InfiniteScroll from "react-infinite-scroller";
import getMaxResolutionImage from "../../../lib/getMaxResolutionImage.ts";

const Feed = () => {
    const selectedCategory = useFeedStore((state) => state.selectedCategory);
    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ["feed", selectedCategory],
            queryFn: async ({ pageParam }) => {
                const getVideosResponse = await getVideos({
                    categoryId: selectedCategory,
                    nextPageToken: pageParam,
                });
                const fetchedFeed = getVideosResponse.data.items;
                const channelIds: string[] = [];
                let feedItems: FeedInterface[] = fetchedFeed.map(
                    (feedItem: FetchedVideoDetails) => {
                        channelIds.push(feedItem.snippet.channelId);
                        const thumbnails = feedItem.snippet.thumbnails;
                        const { maxResolutionImageURL } =
                            getMaxResolutionImage(thumbnails);
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
                            thumbnail: maxResolutionImageURL,
                            views: feedItem.statistics.viewCount,
                        };
                    }
                );
                const getChannelDetailsByIdsResponse =
                    await getChannelsDetailsByIds({
                        channelIds,
                        part: ["snippet"],
                    });
                const channelDetails: FetchedChannelDetails[] =
                    getChannelDetailsByIdsResponse.data.items;
                feedItems = feedItems.map((feedItem) => {
                    const channel = channelDetails.find(
                        (channel) => channel.id === feedItem.channel.id
                    );
                    return {
                        ...feedItem,
                        channel: {
                            ...feedItem.channel,
                            thumbnail:
                                channel &&
                                channel.snippet.thumbnails.default.url,
                        },
                    };
                });
                return {
                    feedItems,
                    nextPageToken: getVideosResponse.data.nextPageToken,
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
            {data?.pages.map((feedPage, index) => (
                <React.Fragment key={index}>
                    {feedPage.feedItems.map((feedItem, index) => (
                        <FeedCard key={index} {...feedItem} />
                    ))}
                </React.Fragment>
            ))}
            {(isFetching || isFetchingNextPage) &&
                new Array(12)
                    .fill(0)
                    .map((_, index) => <FeedCardSkeleton key={index} />)}
        </InfiniteScroll>
    );
};

export default Feed;
