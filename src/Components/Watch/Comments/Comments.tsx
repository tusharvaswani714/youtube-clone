import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import useVideoDetailsStore from "../../../Zustand/videoDetails";
import commaNumber from "comma-number";
import getCommentsByVideoId from "../../../DataFetchers/Comments/getByVideoId";
import {
    CommentOrCommentReply as CommentOrCommentReplyInterface,
    FetchedComment,
} from "../../../config/interfaces";
import InfiniteScroll from "react-infinite-scroller";
import { CommentSkeleton } from "./CommentSkeleton/CommentSkeleton";
import CommentOrCommentReply from "./CommentOrCommentReply/CommentOrCommentReply";
import classNames from "classnames";
import { WatchPageDisplayModes } from "../../../config/enums";

interface CommentsProps {
    watchPageDisplayMode: WatchPageDisplayModes;
}

const Comments = ({ watchPageDisplayMode }: CommentsProps) => {
    const commentCount = useVideoDetailsStore(
        (state) => state.videoDetails?.commentCount
    );
    const videoId = useVideoDetailsStore((state) => state.videoDetails?.id);
    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ["comments", videoId],
            refetchOnMount: false,
            queryFn: async ({ pageParam }) => {
                if (videoId) {
                    const getCommentsByVideoIdResponse =
                        await getCommentsByVideoId({
                            videoId,
                            pageToken: pageParam,
                        });
                    const fetchedComments: FetchedComment[] =
                        getCommentsByVideoIdResponse.data.items;
                    const comments: CommentOrCommentReplyInterface[] =
                        fetchedComments.map((fetchedComment) => ({
                            id: fetchedComment.id,
                            author: {
                                id: fetchedComment.snippet.topLevelComment
                                    .snippet.authorChannelId.value,
                                name: fetchedComment.snippet.topLevelComment
                                    .snippet.authorDisplayName,
                                profileURL:
                                    fetchedComment.snippet.topLevelComment
                                        .snippet.authorProfileImageUrl,
                            },
                            content:
                                fetchedComment.snippet.topLevelComment.snippet
                                    .textDisplay,
                            publishedAt:
                                fetchedComment.snippet.topLevelComment.snippet
                                    .publishedAt,
                            updatedAt:
                                fetchedComment.snippet.topLevelComment.snippet
                                    .updatedAt,
                            numOfLikes:
                                fetchedComment.snippet.topLevelComment.snippet
                                    .likeCount,
                            numOfReplies:
                                fetchedComment.snippet.totalReplyCount,
                            reply: false,
                        }));
                    return {
                        commentItems: comments,
                        nextPageToken:
                            getCommentsByVideoIdResponse.data.nextPageToken,
                    };
                }
            },
            refetchOnWindowFocus: false,
            getNextPageParam: (lastPage) => lastPage?.nextPageToken,
            enabled: !!videoId,
        });
    if (!commentCount) return null;
    return (
        <div
            className={classNames("flex flex-col gap-[2rem]", {
                "mt-[2.4rem]":
                    watchPageDisplayMode === WatchPageDisplayModes.DEFAULT,
            })}
        >
            <div className="text-primary-light-900 text-[1.8rem] capitalize">
                {commaNumber(commentCount)} comments
            </div>
            <InfiniteScroll
                className="flex flex-col gap-[1.6rem]"
                loadMore={() => fetchNextPage()}
                hasMore={hasNextPage}
                threshold={10}
            >
                {data?.pages.map((commentPage, index) => (
                    <React.Fragment key={index}>
                        {commentPage?.commentItems.map((comment) => (
                            <CommentOrCommentReply
                                key={comment.id}
                                {...comment}
                            />
                        ))}
                    </React.Fragment>
                ))}
                {(isFetching || isFetchingNextPage) &&
                    new Array(12)
                        .fill(0)
                        .map((_, index) => <CommentSkeleton key={index} />)}
            </InfiniteScroll>
        </div>
    );
};

export default Comments;
