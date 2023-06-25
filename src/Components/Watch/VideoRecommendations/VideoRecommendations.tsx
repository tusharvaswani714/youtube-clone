import { useInfiniteQuery } from "@tanstack/react-query";
import useVideoDetailsStore from "../../../Zustand/videoDetails";
import VideoRecommendationCard from "./VideoRecommendationCard/VideoRecommendationCard";
import getVideos from "../../../DataFetchers/Videos/get";
import {
    FetchedVideoDetails,
    VideoRecommendation,
} from "../../../config/interfaces";
import InfiniteScroll from "react-infinite-scroller";
import React from "react";
import VideoRecommendationCardSkeleton from "./VideoRecommendationCardSkeleton/VideoRecommendationCardSkeleton";
import getMaxResolutionImage from "../../../lib/getMaxResolutionImage";

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
                const fetchedRecommendations = getVideosResponse.data.items;
                const channelIds: string[] = [];
                const recommendations: VideoRecommendation[] =
                    fetchedRecommendations.map(
                        (fetchedRecommendation: FetchedVideoDetails) => {
                            channelIds.push(
                                fetchedRecommendation.snippet.channelId
                            );
                            const thumbnails =
                                fetchedRecommendation.snippet.thumbnails;
                            const { maxResolutionImageURL } =
                                getMaxResolutionImage(thumbnails);
                            return {
                                id: fetchedRecommendation.id,
                                title: fetchedRecommendation.snippet.title,
                                publishedAt:
                                    fetchedRecommendation.snippet.publishedAt,
                                channel: {
                                    id: fetchedRecommendation.snippet.channelId,
                                    title: fetchedRecommendation.snippet
                                        .channelTitle,
                                },
                                duration:
                                    fetchedRecommendation.contentDetails
                                        .duration,
                                thumbnail: maxResolutionImageURL,
                                views: fetchedRecommendation.statistics
                                    .viewCount,
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
