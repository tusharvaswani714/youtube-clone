import { useEffect } from "react";
import VideoPlayerAndDetails from "../Components/Watch/VideoPlayerAndDetails/VideoPlayerAndDetails";
import useVideoDetailsStore from "../Zustand/videoDetails";
import Comments from "../Components/Watch/Comments/Comments";
import VideoRecommendations from "../Components/Watch/VideoRecommendations/VideoRecommendations";

const Watch = () => {
    const resetStore = useVideoDetailsStore((state) => state.resetStore);
    useEffect(() => {
        return resetStore;
    }, [resetStore]);
    return (
        <div className="flex gap-[2.4rem] max-w-[150rem] m-auto">
            <div className="w-[62%]">
                <VideoPlayerAndDetails />
                <Comments />
            </div>
            <div className="w-[38%]">
                <VideoRecommendations />
            </div>
        </div>
    );
};

export default Watch;
