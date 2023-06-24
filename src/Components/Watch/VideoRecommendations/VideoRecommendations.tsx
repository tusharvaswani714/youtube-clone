import { useInfiniteQuery } from "@tanstack/react-query";
import useVideoDetailsStore from "../../../Zustand/videoDetails";
import VideoRecommendationCard from "./VideoRecommendationCard/VideoRecommendationCard";
import getVideos from "../../../DataFetchers/Videos/get";
import { FetchedFeed, VideoRecommendation } from "../../../config/interfaces";
import InfiniteScroll from "react-infinite-scroller";
import React from "react";
import VideoRecommendationCardSkeleton from "./VideoRecommendationCardSkeleton/VideoRecommendationCardSkeleton";

const VideoRecommendations = () => {
    const categoryId = useVideoDetailsStore(
        (state) => state.videoDetails?.categoryId
    );
    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ["videoRecommendations", categoryId],
            enabled: !!categoryId,
            queryFn: async ({ pageParam }) => {
                const getVideosResponse = await getVideos({
                    categoryId: categoryId,
                    nextPageToken: pageParam,
                });
                const fetchedFeed = getVideosResponse.data.items;
                const channelIds: string[] = [];
                const recommendations: VideoRecommendation[] = fetchedFeed.map(
                    (recommendation: FetchedFeed) => {
                        channelIds.push(recommendation.snippet.channelId);
                        const thumbnails = recommendation.snippet.thumbnails;
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
                            id: recommendation.id,
                            title: recommendation.snippet.title,
                            publishedAt: recommendation.snippet.publishedAt,
                            channel: {
                                id: recommendation.snippet.channelId,
                                title: recommendation.snippet.channelTitle,
                            },
                            duration: recommendation.contentDetails.duration,
                            thumbnail: maxResolutionImageURL,
                            views: recommendation.statistics.viewCount,
                        };
                    }
                );
                return {
                    recommendationItems: recommendations,
                    nextPageToken: getVideosResponse.data.nextPageToken,
                };
            },
            refetchOnWindowFocus: false,
            getNextPageParam: (lastPage) => lastPage.nextPageToken,
        });
    return (
        <InfiniteScroll
            className="flex flex-col gap-4"
            loadMore={() => fetchNextPage()}
            hasMore={hasNextPage}
            threshold={10}
        >
            {data?.pages.map((videoRecommendationsPage, index) => (
                <React.Fragment key={index}>
                    {videoRecommendationsPage.recommendationItems.map(
                        (recommendation, index) => (
                            <VideoRecommendationCard
                                key={index}
                                {...recommendation}
                            />
                        )
                    )}
                </React.Fragment>
            ))}
            {(isFetching || isFetchingNextPage || !categoryId) &&
                new Array(12)
                    .fill(0)
                    .map((_, index) => (
                        <VideoRecommendationCardSkeleton key={index} />
                    ))}
        </InfiniteScroll>
    );
};

export default VideoRecommendations;
