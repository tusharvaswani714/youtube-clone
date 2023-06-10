import axiosInstance from "..";

interface GetChannelDetailsByIdsData {
    channelIds: string[];
}

const getChannelsDetailsByIds = async ({
    channelIds,
}: GetChannelDetailsByIdsData) =>
    await axiosInstance.get("channels", {
        params: {
            part: "snippet",
            id: channelIds.join(","),
            key: import.meta.env.VITE_YOUTUBE_API_KEY,
        },
    });

export default getChannelsDetailsByIds;
