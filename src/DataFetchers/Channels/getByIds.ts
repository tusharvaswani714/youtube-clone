import axiosInstance from "..";

interface GetChannelDetailsByIdsData {
    channelIds: string[];
    part: string[];
}

const getChannelsDetailsByIds = async ({
    channelIds,
    part,
}: GetChannelDetailsByIdsData) =>
    await axiosInstance.get("channels", {
        params: {
            part: part.join(","),
            id: channelIds.join(","),
            key: import.meta.env.VITE_YOUTUBE_API_KEY,
        },
    });

export default getChannelsDetailsByIds;
