import {
    CommentOrCommentReply as CommentOrCommentReplyInterface,
    FetchedCommentReply,
} from "../../../../config/interfaces.js";
import { Link } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { BiDislike, BiLike } from "react-icons/bi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import millify from "millify";
import { useInfiniteQuery } from "@tanstack/react-query";
import getCommentRepliesByCommentId from "../../../../DataFetchers/Replies/getCommentRepliesByCommentId.js";
import React, { useState } from "react";
import classNames from "classnames";
import { BsArrow90DegDown } from "react-icons/bs";
import queryClient from "../../../../main.js";
import { Oval } from "react-loader-spinner";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const CommentOrCommentReply = (data: CommentOrCommentReplyInterface) => {
    const {
        id: commentId,
        author,
        content,
        numOfLikes,
        reply,
        publishedAt,
        updatedAt,
    } = data;
    const [showReplies, setShowReplies] = useState(false);
    const {
        data: replies,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["replies", commentId],
        queryFn: async ({ pageParam }) => {
            const getCommentRepliesByCommentIdResponse =
                await getCommentRepliesByCommentId({
                    commentId,
                    pageToken: pageParam,
                });
            const fetchedReplies: FetchedCommentReply[] =
                getCommentRepliesByCommentIdResponse.data.items;
            const replies: CommentOrCommentReplyInterface[] =
                fetchedReplies.map((fetchedReply) => ({
                    id: fetchedReply.id,
                    author: {
                        id: fetchedReply.snippet.authorChannelId.value,
                        name: fetchedReply.snippet.authorDisplayName,
                        profileURL: fetchedReply.snippet.authorProfileImageUrl,
                    },
                    content: fetchedReply.snippet.textDisplay,
                    publishedAt: fetchedReply.snippet.publishedAt,
                    updatedAt: fetchedReply.snippet.updatedAt,
                    numOfLikes: fetchedReply.snippet.likeCount,
                    reply: true,
                }));
            return {
                repliesItems: replies,
                nextPageToken:
                    getCommentRepliesByCommentIdResponse.data.nextPageToken,
            };
        },
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage) => lastPage?.nextPageToken,
        enabled: !reply && showReplies,
    });
    return (
        <div className="flex gap-[1.6rem]">
            <Link to={`/channel/${author.id}`}>
                <div
                    className={classNames("rounded-full bg-cover bg-center", {
                        "w-[2.4rem] h-[2.4rem]": reply,
                        "w-16 h-16": !reply,
                    })}
                    style={{
                        backgroundImage: `url("${author.profileURL}")`,
                    }}
                />
            </Link>
            <div className="flex flex-1 flex-col gap-1">
                <div className="text-[1.4rem] flex gap-2">
                    <Link
                        to={`/channel/${author.id}`}
                        className="text-primary-light-900 font-medium"
                    >
                        {author.name}
                    </Link>
                    <span className="font-normal text-primary-light-800">
                        {timeAgo.format(new Date(publishedAt))}{" "}
                        {publishedAt !== updatedAt ? "(edited)" : null}
                    </span>
                </div>
                <div className="text-primary-light-900 mb-2">{content}</div>
                <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <BiLike className="text-primary-light-900 text-4xl" />
                        {numOfLikes ? (
                            <span className="text-primary-light-800 text-[1.4rem]">
                                {millify(numOfLikes, {
                                    precision: 1,
                                })}
                            </span>
                        ) : null}
                    </div>
                    <div>
                        <BiDislike className="text-primary-light-900 text-4xl" />
                    </div>
                </div>
                {!data.reply && data.numOfReplies ? (
                    <button
                        onClick={() =>
                            setShowReplies((prev) => {
                                const newValue = !prev;
                                if (!newValue)
                                    queryClient.resetQueries(["replies"]);
                                return newValue;
                            })
                        }
                        className="mt-2 inline-flex max-w-max items-center gap-4 -ml-5 px-[1.6rem] py-[0.8rem] text-secondary-blue-900 font-medium select-none hover:bg-secondary-blue-100 rounded-[2.2rem]"
                    >
                        {showReplies ? (
                            <FiChevronUp className="text-[2rem]" />
                        ) : (
                            <FiChevronDown className="text-[2rem]" />
                        )}
                        {data.numOfReplies} replies
                    </button>
                ) : null}
                {showReplies && (
                    <div className="flex flex-col gap-4">
                        {replies &&
                            replies.pages.map((repliesPage, index) => (
                                <React.Fragment key={index}>
                                    {repliesPage.repliesItems.map(
                                        (reply, index) => (
                                            <CommentOrCommentReply
                                                key={index}
                                                {...reply}
                                            />
                                        )
                                    )}
                                </React.Fragment>
                            ))}
                        {isFetching && (
                            <Oval
                                height={30}
                                width={30}
                                color="#aaa"
                                ariaLabel="oval-loading"
                                wrapperClass="m-auto"
                                secondaryColor="transparent"
                                strokeWidth={4}
                            />
                        )}
                        {hasNextPage && (
                            <button
                                onClick={() => fetchNextPage()}
                                className="mt-2 inline-flex max-w-max items-center gap-4 -ml-5 px-[1.6rem] py-[0.8rem] text-secondary-blue-900 font-medium select-none hover:bg-secondary-blue-100 rounded-[2.2rem]"
                            >
                                <BsArrow90DegDown className="-rotate-90 text-[2rem]" />
                                Show more replies
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentOrCommentReply;
