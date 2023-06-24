import axiosInstance from "..";

interface GetVideosData {
    categoryId?: number;
    nextPageToken?: string;
}

const getVideos = async ({ categoryId, nextPageToken }: GetVideosData) =>
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

export default getVideos;
