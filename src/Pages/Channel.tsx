import { useEffect } from "react";
import ChannelDetails from "../Components/Channel/ChannelDetails/ChannelDetails";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getChannelsDetailsByIds from "../DataFetchers/Channels/getByIds";
import useChannelDetailsStore from "../Zustand/channelDetails";
import ChannelVideos from "../Components/Channel/ChannelVideos/ChannelVideos";

const Channel = () => {
    const { id: channelId } = useParams();
    const setChannelDetails = useChannelDetailsStore(
        (state) => state.setChannelDetails
    );
    const resetStore = useChannelDetailsStore((state) => state.resetStore);
    useQuery({
        queryKey: ["channel", channelId],
        enabled: !!channelId,
        queryFn: async () => {
            if (channelId) {
                const getChannelsDetailsByIdsResponse =
                    await getChannelsDetailsByIds({
                        channelIds: [channelId],
                        part: [
                            "snippet",
                            "statistics",
                            "brandingSettings",
                            "contentDetails",
                        ],
                    });
                return getChannelsDetailsByIdsResponse.data.items[0];
            }
        },
        onSuccess: (data) => {
            const thumbnails = data.snippet.thumbnails;
            let maxResolutionImageURL = null,
                maxResolution = 0;
            for (const resolutionKey in thumbnails) {
                const image = thumbnails[resolutionKey];
                const resolution = image.width * image.height;
                if (resolution > maxResolution) {
                    maxResolution = resolution;
                    maxResolutionImageURL = image.url;
                }
            }
            setChannelDetails({
                id: data.id,
                bannerURL: data.brandingSettings.image?.bannerExternalUrl,
                profileURL: maxResolutionImageURL,
                name: data.snippet.title,
                desc: data.snippet.description,
                subscribers: Number(data.statistics.subscriberCount),
                numOfVideos: Number(data.statistics.videoCount),
            });
        },
        refetchOnWindowFocus: false,
    });
    useEffect(() => {
        return resetStore;
    }, [resetStore]);
    return (
        <div>
            <ChannelDetails />
            <ChannelVideos />
        </div>
    );
};

export default Channel;
