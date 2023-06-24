import millify from "millify";
import useChannelDetailsStore from "../../../../Zustand/channelDetails";

const ChannelMainDetails = () => {
    const channelDetails = useChannelDetailsStore(
        (state) => state.channelDetails
    );
    if (!channelDetails) return null;
    return (
        <div className="flex gap-[2.4rem] items-center px-20 py-8">
            <div
                className="flex-shrink-0 bg-cover bg-center w-52 h-52 rounded-full"
                style={{
                    backgroundImage: `url(${channelDetails.profileURL})`,
                }}
            />
            <div>
                <div className="text-primary-light-900 font-normal text-[2.4rem]">
                    {channelDetails.name}
                </div>
                <div className="text-primary-light-800 text-[1.4rem] flex flex-col gap-4">
                    <div className="flex gap-4">
                        <span>
                            {millify(channelDetails.subscribers, {
                                precision: 1,
                            })}{" "}
                            subscribers
                        </span>
                        <span>
                            {millify(channelDetails.numOfVideos, {
                                precision: 1,
                            })}{" "}
                            videos
                        </span>
                    </div>
                    <div className="max-w-3xl text-ellipsis overflow-hidden whitespace-nowrap">
                        {channelDetails.desc}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChannelMainDetails;
