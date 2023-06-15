import axiosInstance from "..";

interface GetCommentsByVideoIdData {
    videoId: string;
    pageToken: string;
}

const getCommentsByVideoId = async ({
    videoId,
    pageToken,
}: GetCommentsByVideoIdData) =>
    await axiosInstance.get("commentThreads", {
        params: {
            part: "snippet",
            videoId,
            pageToken,
            maxResults: 10,
            order: "relevance",
            key: import.meta.env.VITE_YOUTUBE_API_KEY,
        },
    });

export default getCommentsByVideoId;
