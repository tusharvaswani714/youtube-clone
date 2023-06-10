import axiosInstance from "..";

interface GetFeedData {
    categoryId?: number;
    nextPageToken?: string;
}

const getFeed = async ({ categoryId, nextPageToken }: GetFeedData) =>
    await axiosInstance.get("videos", {
        params: {
            part: "snippet,statistics,contentDetails",
            chart: "mostPopular",
            videoCategoryId: categoryId,
            maxResults: 12,
            pageToken: nextPageToken,
            key: import.meta.env.VITE_YOUTUBE_API_KEY,
        },
    });

export default getFeed;
