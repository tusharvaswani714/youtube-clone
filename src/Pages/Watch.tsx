import { useState, useEffect } from "react";
import VideoPlayerAndDetails from "../Components/Watch/VideoPlayerAndDetails/VideoPlayerAndDetails";
import useVideoDetailsStore from "../Zustand/videoDetails";
import Comments from "../Components/Watch/Comments/Comments";
import VideoRecommendations from "../Components/Watch/VideoRecommendations/VideoRecommendations";
import { WatchPageDisplayModes } from "../config/enums";

const Watch = () => {
    const resetStore = useVideoDetailsStore((state) => state.resetStore);
    const [watchPageDisplayMode, setWatchPageDisplayMode] =
        useState<WatchPageDisplayModes>(WatchPageDisplayModes.DEFAULT);
    useEffect(() => {
        const resizeHandler = () => {
            if (window.innerWidth < 1060)
                setWatchPageDisplayMode(WatchPageDisplayModes.ONE_COLUMN);
            else setWatchPageDisplayMode(WatchPageDisplayModes.DEFAULT);
        };
        resizeHandler();
        window.addEventListener("resize", resizeHandler);
        return () => {
            resetStore();
            window.removeEventListener("resize", resizeHandler);
        };
    }, [resetStore]);
    return (
        <div className="px-10 sm:px-20">
            <div className="watch-page-grid-container max-w-[150rem] m-auto">
                <VideoPlayerAndDetails />
                <Comments />
                <VideoRecommendations
                    watchPageDisplayMode={watchPageDisplayMode}
                />
            </div>
        </div>
    );
};

export default Watch;
