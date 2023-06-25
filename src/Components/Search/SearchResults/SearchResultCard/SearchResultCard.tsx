import TimeAgo from "javascript-time-ago";
import { SearchResult } from "../../../../config/interfaces";
import en from "javascript-time-ago/locale/en";
import millify from "millify";
import {
    parse as parseIso8601Duration,
    toSeconds as parsediso8601DurationToSeconds,
} from "iso8601-duration";
import TimeFormat from "hh-mm-ss";
import { Link, useNavigate } from "react-router-dom";

TimeAgo.setDefaultLocale(en.locale);
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

const SearchResultCard = ({
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
    desc,
}: SearchResult) => {
    const navigate = useNavigate();
    return (
        <div
            className="flex gap-[1.6rem] cursor-pointer"
            onClick={() => navigate(`/watch?v=${id}`)}
        >
            <div className="relative max-w-xl w-full flex-shrink-0">
                <Link
                    className="block w-full aspect-video"
                    to={`/watch?v=${id}`}
                >
                    <div
                        className="w-full h-full bg-primary-light-700 rounded-[1.2rem] bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${thumbnail})`,
                        }}
                    />
                </Link>
                <div className="absolute bottom-[0.4rem] right-[0.4rem] px-[0.4rem] py-[0.3rem] bg-[rgba(0,0,0,0.8)] text-white rounded-[0.4rem] text-[1.2rem] font-medium">
                    {TimeFormat.fromS(
                        parsediso8601DurationToSeconds(
                            parseIso8601Duration(duration)
                        )
                    )}
                </div>
            </div>
            <div className="overflow-hidden flex flex-1 flex-col gap-[1.2rem] text-primary-light-800">
                <div>
                    <Link
                        to={`/watch?v=${id}`}
                        className="text-primary-light-900 text-[1.8rem] font-normal max-h-[4.8rem] overflow-hidden text-ellipsis line-clamp-2"
                    >
                        {title}
                    </Link>
                    <div className="mt-2 text-[1.4rem]">
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
                <div className="flex items-center gap-[0.8rem]">
                    <Link to={`/channel/${channelId}`} className="shrink-0">
                        <img
                            className="w-[2.4rem] h-[2.4rem] rounded-full"
                            src={channelThumbnail}
                        />
                    </Link>
                    <Link
                        to={`/channel/${channelId}`}
                        className="capitalize text-[1.2rem] hover:text-primary-light-900"
                    >
                        {channelTitle}
                    </Link>
                </div>
                <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {desc}
                </div>
            </div>
        </div>
    );
};

export default SearchResultCard;
