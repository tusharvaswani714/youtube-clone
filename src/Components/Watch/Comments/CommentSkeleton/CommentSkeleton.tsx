import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const CommentSkeleton = () => {
    return (
        <div className="flex gap-[1.6rem]">
            <Skeleton
                baseColor="#202020"
                highlightColor="#444"
                className="w-16 h-16"
                containerClassName="w-16"
                circle
                duration={1.2}
            />
            <div className="flex-1 flex flex-col gap-1">
                <Skeleton
                    baseColor="#202020"
                    highlightColor="#444"
                    className="w-80 h-5"
                    containerClassName="w-80"
                    duration={1.2}
                />
                <Skeleton
                    baseColor="#202020"
                    highlightColor="#444"
                    className="w-full h-5 mb-1"
                    count={2}
                    containerClassName="w-full"
                    duration={1.2}
                />
                {/* <Skeleton
                    baseColor="#202020"
                    highlightColor="#444"
                    className="w-80 h-8"
                    containerClassName="w-80"
                    duration={1.2}
                /> */}
                <Skeleton
                    baseColor="#202020"
                    highlightColor="#444"
                    className="w-40 h-[2.6rem]"
                    containerClassName="w-40"
                    duration={1.2}
                />
            </div>
        </div>
    );
};
