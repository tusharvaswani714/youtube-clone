import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const VideoRecommendationCardSkeleton = () => {
    return (
        <div className="flex gap-4 w-full">
            <Skeleton
                baseColor="#202020"
                highlightColor="#444"
                className="flex-shrink-0 w-[40%] aspect-video"
                containerClassName="w-[40%]"
                borderRadius="1.2rem"
                duration={1.2}
            />
            <div className="flex-1 gap-6">
                <Skeleton
                    baseColor="#202020"
                    highlightColor="#444"
                    className="h-8 mb-2"
                    containerClassName="w-full"
                    count={3}
                />
            </div>
        </div>
    );
};

export default VideoRecommendationCardSkeleton;
