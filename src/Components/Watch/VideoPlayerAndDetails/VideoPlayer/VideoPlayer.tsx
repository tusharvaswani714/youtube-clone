import useVideoDetailsStore from "../../../../Zustand/videoDetails";

const VideoPlayer = () => {
    const videoId = useVideoDetailsStore((state) => state.videoDetails?.id);
    if (!videoId) return null;
    return (
        <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
        ></iframe>
    );
};

export default VideoPlayer;
