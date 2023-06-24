import useChannelDetailsStore from "../../../../Zustand/channelDetails";

const ChannelBanner = () => {
    const channelBannerURL = useChannelDetailsStore(
        (state) => state.channelDetails?.bannerURL
    );
    if (!channelBannerURL) return null;
    return (
        <div
            className="bg-cover bg-no-repeat bg-center h-[16vw]"
            style={{
                backgroundImage: `url(${channelBannerURL})`,
            }}
        />
    );
};

export default ChannelBanner;
