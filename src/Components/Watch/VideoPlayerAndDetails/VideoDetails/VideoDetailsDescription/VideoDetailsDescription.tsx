import { useState } from "react";
import useVideoDetailsStore from "../../../../../Zustand/videoDetails";
import millify from "millify";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import classNames from "classnames";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const VideoDetailsDescription = () => {
    const [showMore, setShowMore] = useState(false);
    const videoDetails = useVideoDetailsStore(({ videoDetails }) => {
        if (videoDetails) {
            return {
                desc: videoDetails.desc,
                publishedAt: videoDetails.publishedAt,
                viewCount: videoDetails.viewCount,
            };
        }
    });
    if (!videoDetails) return null;
    return (
        <div
            className={classNames(
                "cursor-pointer p-[1.2rem] text-primary-light-900 bg-[rgba(255,255,255,0.1)] rounded-[1.2rem] font-normal",
                {
                    "hover:bg-[rgba(255,255,255,0.2)]": !showMore,
                }
            )}
        >
            <div className="font-bold">
                <span className="mr-3">
                    {millify(videoDetails.viewCount, {
                        precision: 1,
                    })}
                </span>
                <span>
                    {timeAgo.format(new Date(videoDetails.publishedAt))}
                </span>
            </div>
            <div>
                <div
                    className={classNames("overflow-hidden my-[0.2rem]", {
                        "max-h-20": !showMore,
                    })}
                >
                    {videoDetails.desc}
                </div>
                <div
                    className="font-bold"
                    onClick={() => setShowMore((prev) => !prev)}
                >
                    Show {showMore ? "less" : "more"}
                </div>
            </div>
        </div>
    );
};

export default VideoDetailsDescription;
