import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const VideoCardSkeleton = () => {
    return (
        <div className="max-w-xl w-full">
            <Skeleton
                baseColor="#202020"
                highlightColor="#444"
                className="w-full aspect-video"
                borderRadius="1.2rem"
                duration={1.2}
            />
            <div />
            <div className="flex gap-6 mt-6">
                <Skeleton
                    baseColor="#202020"
                    highlightColor="#444"
                    className="w-[3.6rem] h-[3.6rem] shrink-0"
                    circle
                    containerClassName="w-[3.6rem]"
                />
                <div className="flex-1">
                    <Skeleton
                        baseColor="#202020"
                        highlightColor="#444"
                        className="h-8 mb-2"
                    />
                    <Skeleton
                        baseColor="#202020"
                        highlightColor="#444"
                        className="h-8"
                    />
                </div>
            </div>
        </div>
    );
};

export default VideoCardSkeleton;
