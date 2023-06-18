import useVideoDetailsStore from "../../../../Zustand/videoDetails";
import VideoPlayerSkeleton from "./VideoPlayerSkeleton/VideoPlayerSkeleton";

const VideoPlayer = () => {
    const videoId = useVideoDetailsStore((state) => state.videoDetails?.id);
    return videoId ? (
        <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
        ></iframe>
    ) : (
        <VideoPlayerSkeleton />
    );
};

export default VideoPlayer;
