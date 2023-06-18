import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const VideoPlayerSkeleton = () => {
    return (
        <Skeleton
            baseColor="#202020"
            highlightColor="#444"
            className="w-full aspect-video"
            duration={1.2}
        />
    );
};

export default VideoPlayerSkeleton;
