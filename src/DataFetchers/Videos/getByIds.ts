import axiosInstance from "..";

interface GetVideoDetailsByIdsData {
    videoIds: string[];
}

const getVideoDetailsByIds = async ({ videoIds }: GetVideoDetailsByIdsData) =>
    await axiosInstance.get("videos", {
        params: {
            part: "statistics,contentDetails",
            id: videoIds.join(","),
            key: import.meta.env.VITE_YOUTUBE_API_KEY,
        },
    });

export default getVideoDetailsByIds;
