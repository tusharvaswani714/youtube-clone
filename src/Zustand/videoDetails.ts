import { create } from "zustand";
import { VideoDetails } from "../config/interfaces";

interface VideoDetailsState {
    videoDetails?: VideoDetails;
    setVideoDetails: (videoDetails: VideoDetails) => void;
    resetStore: () => void;
}

const initialState = {
    videoDetails: undefined,
};

const useVideoDetailsStore = create<VideoDetailsState>()((set) => ({
    ...initialState,
    setVideoDetails: (videoDetails) => set({ videoDetails }),
    resetStore: () => set(initialState),
}));

export default useVideoDetailsStore;
