import classNames from "classnames";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { WatchPageDisplayModes } from "../../../../config/enums";

interface VideoRecommendationCardSkeletonProps {
    watchDisplayMode: WatchPageDisplayModes;
}

const VideoRecommendationCardSkeleton = ({
    watchDisplayMode,
}: VideoRecommendationCardSkeletonProps) => {
    return (
        <div className="flex gap-4 w-full">
            <Skeleton
                baseColor="#202020"
                highlightColor="#444"
                className="flex-shrink-0 w-[40%] aspect-video"
                containerClassName={classNames("w-[40%] min-w-[16rem]", {
                    "max-w-[16rem]":
                        watchDisplayMode === WatchPageDisplayModes.ONE_COLUMN,
                })}
                borderRadius="1.2rem"
                duration={1.2}
            />
            <Skeleton
                baseColor="#202020"
                highlightColor="#444"
                className="h-5"
                containerClassName="w-full"
                count={3}
            />
        </div>
    );
};

export default VideoRecommendationCardSkeleton;
