import axiosInstance from "..";

interface GetVideoDetailsByIdsData {
    videoIds: string[];
    part: string[];
}

const getVideoDetailsByIds = async ({
    videoIds,
    part,
}: GetVideoDetailsByIdsData) =>
    await axiosInstance.get("videos", {
        params: {
            part: part.join(","),
            id: videoIds.join(","),
            key: import.meta.env.VITE_YOUTUBE_API_KEY,
        },
    });

export default getVideoDetailsByIds;
