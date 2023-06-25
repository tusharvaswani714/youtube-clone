import { useEffect } from "react";
import ChannelDetails from "../Components/Channel/ChannelDetails/ChannelDetails";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getChannelsDetailsByIds from "../DataFetchers/Channels/getByIds";
import useChannelDetailsStore from "../Zustand/channelDetails";
import ChannelVideos from "../Components/Channel/ChannelVideos/ChannelVideos";
import getMaxResolutionImage from "../lib/getMaxResolutionImage";
import { FetchedChannelDetails } from "../config/interfaces";

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
        onSuccess: (channelDetails: FetchedChannelDetails) => {
            const thumbnails = channelDetails.snippet.thumbnails;
            const { maxResolutionImageURL } = getMaxResolutionImage(thumbnails);
            setChannelDetails({
                id: channelDetails.id,
                bannerURL:
                    channelDetails.brandingSettings.image.bannerExternalUrl,
                profileURL: maxResolutionImageURL as string,
                name: channelDetails.snippet.title,
                desc: channelDetails.snippet.description,
                subscribers: Number(channelDetails.statistics.subscriberCount),
                numOfVideos: Number(channelDetails.statistics.videoCount),
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
