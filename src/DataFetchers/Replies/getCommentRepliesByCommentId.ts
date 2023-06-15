import axiosInstance from "..";

interface GetCommentRepliesByCommentIdData {
    commentId: string;
    pageToken: string;
}

const getCommentRepliesByCommentId = async ({
    commentId,
    pageToken,
}: GetCommentRepliesByCommentIdData) =>
    await axiosInstance.get("comments", {
        params: {
            part: "snippet",
            parentId: commentId,
            pageToken,
            maxResults: 10,
            key: import.meta.env.VITE_YOUTUBE_API_KEY,
        },
    });

export default getCommentRepliesByCommentId;
