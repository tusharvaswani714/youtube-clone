import { create } from "zustand";
import { ChannelDetails } from "../config/interfaces";

interface ChannelDetailsState {
    channelDetails?: ChannelDetails;
    setChannelDetails: (channelDetails: ChannelDetails) => void;
    resetStore: () => void;
}

const initialState = {
    channelDetails: undefined,
};

const useChannelDetailsStore = create<ChannelDetailsState>()((set) => ({
    ...initialState,
    setChannelDetails: (channelDetails) => set({ channelDetails }),
    resetStore: () => set(initialState),
}));

export default useChannelDetailsStore;
