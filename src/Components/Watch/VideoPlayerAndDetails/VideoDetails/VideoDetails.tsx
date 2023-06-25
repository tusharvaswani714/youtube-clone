import useVideoDetailsStore from "../../../../Zustand/videoDetails";
import { Link } from "react-router-dom";
import millify from "millify";
import { AiOutlineLike } from "react-icons/ai";
import VideoDetailsDescription from "./VideoDetailsDescription/VideoDetailsDescription";
import VideoDetailsSkeleton from "./VideoDetailsSkeleton/VideoDetailsSkeleton";

const VideoDetails = () => {
    const videoDetails = useVideoDetailsStore(({ videoDetails }) => {
        if (videoDetails) {
            return {
                title: videoDetails.title,
                authorChannelDetails: videoDetails.authorChannelDetails,
                likeCount: videoDetails.likeCount,
            };
        }
    });
    return (
        <div className="mt-[2rem]">
            {videoDetails ? (
                <>
                    <div className="text-3xl font-semibold text-primary-light-900">
                        {videoDetails.title}
                    </div>
                    <div className="my-[1.6rem] flex items-center justify-between">
                        <div className="flex gap-[1.2rem]">
                            <Link
                                to={`/channel/${videoDetails.authorChannelDetails.id}`}
                            >
                                <img
                                    className="w-16 h-16 rounded-full"
                                    src={
                                        videoDetails.authorChannelDetails
                                            .profileURL
                                    }
                                />
                            </Link>
                            <div>
                                <Link
                                    to={`/channel/${videoDetails.authorChannelDetails.id}`}
                                    className="text-primary-light-900 font-medium"
                                >
                                    {videoDetails.authorChannelDetails.name}
                                </Link>
                                <div className="text-primary-light-800 text-[1.2rem] font-normal">
                                    {millify(
                                        videoDetails.authorChannelDetails
                                            .totalSubscribers,
                                        {
                                            precision: 1,
                                        }
                                    )}{" "}
                                    subscribers
                                </div>
                            </div>
                        </div>
                        <div className="text-[1.4rem] text-primary-light-900 font-medium flex items-center gap-4 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] px-6 py-3 rounded-[1.8rem] cursor-default">
                            <AiOutlineLike className="text-4xl" />
                            {millify(videoDetails.likeCount, {
                                precision: 1,
                            })}
                        </div>
                    </div>
                    <VideoDetailsDescription />
                </>
            ) : (
                <VideoDetailsSkeleton />
            )}
        </div>
    );
};

export default VideoDetails;
