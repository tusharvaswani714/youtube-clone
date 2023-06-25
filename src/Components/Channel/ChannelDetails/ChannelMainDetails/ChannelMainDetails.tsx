import millify from "millify";
import useChannelDetailsStore from "../../../../Zustand/channelDetails";

const ChannelMainDetails = () => {
    const channelDetails = useChannelDetailsStore(
        (state) => state.channelDetails
    );
    if (!channelDetails) return null;
    return (
        <div className="flex flex-col sm:flex-row gap-[1.6rem] sm:gap-[2.4rem] items-center px-10 py-6 sm:px-20 sm:py-8 text-center sm:text-left">
            <div
                className="flex-shrink-0 bg-cover bg-center w-32 h-32 sm:w-52 sm:h-52 rounded-full"
                style={{
                    backgroundImage: `url(${channelDetails.profileURL})`,
                }}
            />
            <div className="overflow-hidden">
                <div className="text-primary-light-900 font-normal text-[1.8rem] sm:text-[2.4rem]">
                    {channelDetails.name}
                </div>
                <div className="text-primary-light-800 text-[1.4rem] flex items-center sm:items-start flex-col gap-2 sm:gap-4">
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
                    <div className="max-w-md sm:max-w-3xl text-ellipsis overflow-hidden whitespace-nowrap">
                        {channelDetails.desc}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChannelMainDetails;
