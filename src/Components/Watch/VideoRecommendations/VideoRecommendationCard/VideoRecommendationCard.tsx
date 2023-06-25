import { Link } from "react-router-dom";
import { VideoRecommendation } from "../../../../config/interfaces";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import millify from "millify";
import {
    parse as parseIso8601Duration,
    toSeconds as parsediso8601DurationToSeconds,
} from "iso8601-duration";
import TimeFormat from "hh-mm-ss";
import { WatchPageDisplayModes } from "../../../../config/enums";
import classNames from "classnames";

TimeAgo.setDefaultLocale(en.locale);
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

interface VideoRecommendationCardProps {
    watchDisplayMode: WatchPageDisplayModes;
    recommendation: VideoRecommendation;
}

const VideoRecommendationCard = ({
    watchDisplayMode,
    recommendation,
}: VideoRecommendationCardProps) => {
    return (
        <Link
            to={`/watch?v=${recommendation.id}`}
            className="flex gap-4 w-full"
        >
            <div
                className={classNames(
                    "w-[40%] min-w-[16rem] aspect-video flex-shrink-0 relative",
                    {
                        "max-w-[16rem]":
                            watchDisplayMode ===
                            WatchPageDisplayModes.ONE_COLUMN,
                    }
                )}
            >
                <div
                    className="w-full h-full bg-primary-light-700 rounded-[1.2rem] bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${recommendation.thumbnail})`,
                    }}
                />
                <div className="absolute bottom-[0.4rem] right-[0.4rem] px-[0.4rem] py-[0.3rem] bg-[rgba(0,0,0,0.8)] text-white rounded-[0.4rem] text-[1.2rem] font-medium">
                    {TimeFormat.fromS(
                        parsediso8601DurationToSeconds(
                            parseIso8601Duration(recommendation.duration)
                        )
                    )}
                </div>
            </div>
            <div className="flex gap-6">
                <div>
                    <div className="text-xl mb-[0.4rem] text-primary-light-900 font-bold pr-10 max-h-[4.8rem] overflow-hidden text-ellipsis line-clamp-2">
                        {recommendation.title}
                    </div>
                    <div className="text-primary-light-800 text-xl">
                        <Link
                            to={`/channel/${recommendation.channel.id}`}
                            className="inline-block capitalize hover:text-primary-light-900"
                        >
                            {recommendation.channel.title}
                        </Link>
                        <div className="flex gap-2 items-center">
                            <div>
                                {millify(recommendation.views, {
                                    precision: 1,
                                })}{" "}
                                views
                            </div>
                            <div className="text-3xl">•</div>
                            <div>
                                {timeAgo.format(
                                    new Date(recommendation.publishedAt)
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default VideoRecommendationCard;
