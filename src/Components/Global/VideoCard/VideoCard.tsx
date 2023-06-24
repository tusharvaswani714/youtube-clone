import { VideoCard as VideoCardInterface } from "../../../config/interfaces";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import millify from "millify";
import {
    parse as parseIso8601Duration,
    toSeconds as parsediso8601DurationToSeconds,
} from "iso8601-duration";
import TimeFormat from "hh-mm-ss";
import { Link } from "react-router-dom";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const VideoCard = ({
    id,
    title,
    publishedAt,
    channel: {
        id: channelId,
        title: channelTitle,
        thumbnail: channelThumbnail,
    },
    duration,
    thumbnail,
    views,
}: VideoCardInterface) => {
    return (
        <Link to={`/watch?v=${id}`} className="inline-block max-w-xl w-full">
            <div className="relative">
                <div
                    className="w-full aspect-video bg-primary-light-700 rounded-[1.2rem] bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${thumbnail})`,
                    }}
                />
                <div className="absolute bottom-[0.4rem] right-[0.4rem] px-[0.4rem] py-[0.3rem] bg-[rgba(0,0,0,0.8)] text-white rounded-[0.4rem] text-[1.2rem] font-medium">
                    {TimeFormat.fromS(
                        parsediso8601DurationToSeconds(
                            parseIso8601Duration(duration)
                        )
                    )}
                </div>
            </div>
            <div className="flex gap-6 mt-6">
                <Link to={`/channel/${channelId}`} className="shrink-0">
                    <img
                        className="w-[3.6rem] h-[3.6rem] rounded-full"
                        src={channelThumbnail}
                    />
                </Link>
                <div>
                    <div className="text-primary-light-900 font-medium pr-10 max-h-[4.8rem] overflow-hidden text-ellipsis line-clamp-2">
                        {title}
                    </div>
                    <div className="text-primary-light-800 text-[1.4rem]">
                        <Link
                            to={`/channel/${channelId}`}
                            className="capitalize hover:text-primary-light-900"
                        >
                            {channelTitle}
                        </Link>
                        <div className="flex gap-2 items-center">
                            <div>
                                {millify(views, {
                                    precision: 1,
                                })}{" "}
                                views
                            </div>
                            <div className="text-3xl">•</div>
                            <div>{timeAgo.format(new Date(publishedAt))}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;
