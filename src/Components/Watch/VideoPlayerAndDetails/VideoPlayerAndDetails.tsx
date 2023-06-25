import VideoPlayer from "./VideoPlayer/VideoPlayer";
import VideoDetails from "./VideoDetails/VideoDetails";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import getVideoDetailsByIds from "../../../DataFetchers/Videos/getByIds";
import useVideoDetailsStore from "../../../Zustand/videoDetails";
import {
    FetchedChannelDetails,
    FetchedVideoDetails,
} from "../../../config/interfaces";
import getChannelsDetailsByIds from "../../../DataFetchers/Channels/getByIds";

const VideoPlayerAndDetails = () => {
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get("v");
    const setVideoDetails = useVideoDetailsStore(
        (state) => state.setVideoDetails
    );
    useQuery({
        queryKey: ["videoDetails", videoId],
        refetchOnMount: false,
        queryFn: async () => {
            if (videoId) {
                const getVideoDetailsByIdsResponse = await getVideoDetailsByIds(
                    {
                        part: ["snippet", "statistics", "player"],
                        videoIds: [videoId],
                    }
                );
                const getChannelDetailsByIdsResponse =
                    await getChannelsDetailsByIds({
                        channelIds: [
                            getVideoDetailsByIdsResponse.data.items[0].snippet
                                .channelId,
                        ],
                        part: ["snippet", "statistics"],
                    });
                return {
                    videoDetails: getVideoDetailsByIdsResponse.data,
                    channelDetails: getChannelDetailsByIdsResponse.data,
                };
            }
        },
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            if (data) {
                const videoDetails: FetchedVideoDetails =
                    data.videoDetails.items[0];
                const channelDetails: FetchedChannelDetails =
                    data.channelDetails.items[0];
                setVideoDetails({
                    id: videoDetails.id,
                    title: videoDetails.snippet.title,
                    desc: videoDetails.snippet.description,
                    categoryId: Number(videoDetails.snippet.categoryId),
                    authorChannelDetails: {
                        id: videoDetails.snippet.channelId,
                        name: videoDetails.snippet.channelTitle,
                        profileURL:
                            channelDetails.snippet.thumbnails.default.url,
                        totalSubscribers:
                            channelDetails.statistics.subscriberCount,
                    },
                    publishedAt: videoDetails.snippet.publishedAt,
                    likeCount: videoDetails.statistics.likeCount,
                    viewCount: videoDetails.statistics.viewCount,
                    commentCount: videoDetails.statistics.commentCount,
                });
            }
        },
        enabled: !!videoId,
    });
    return (
        <div>
            <VideoPlayer />
            <VideoDetails />
        </div>
    );
};

export default VideoPlayerAndDetails;
