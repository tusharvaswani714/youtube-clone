import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const VideoDetailsSkeleton = () => {
    return (
        <div>
            <Skeleton
                baseColor="#202020"
                highlightColor="#444"
                className="w-full h-8 max-w-xl"
                borderRadius="2.8rem"
                duration={1.2}
            />
            <Skeleton
                baseColor="#202020"
                highlightColor="#444"
                className="w-full h-8 max-w-xs mt-6"
                borderRadius="2.8rem"
                duration={1.2}
            />
            <div className="flex gap-6 mt-10">
                <Skeleton
                    baseColor="#202020"
                    highlightColor="#444"
                    className="w-20 h-20 shrink-0"
                    circle
                    containerClassName="w-20"
                />
                <div className="flex-1">
                    <Skeleton
                        baseColor="#202020"
                        highlightColor="#444"
                        className="w-full h-8 max-w-xs"
                        borderRadius="2.8rem"
                        duration={1.2}
                    />
                    <Skeleton
                        baseColor="#202020"
                        highlightColor="#444"
                        className="w-full h-8 max-w-xs mt-4"
                        borderRadius="2.8rem"
                        duration={1.2}
                    />
                </div>
            </div>
        </div>
    );
};

export default VideoDetailsSkeleton;
