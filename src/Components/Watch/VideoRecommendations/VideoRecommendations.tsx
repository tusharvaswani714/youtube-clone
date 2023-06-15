import VideoRecommendationCard from "./VideoRecommendationCard/VideoRecommendationCard";

const VideoRecommendations = () => {
    const data = {
        id: "48h57PspBec",
        title: "$1 vs $1,000,000,000 Yacht!",
        publishedAt: "2023-06-10T16:00:00Z",
        channel: {
            id: "UCX6OQ3DkcsbYNE6H8uQQuVA",
            title: "MrBeast",
            thumbnail:
                "https://yt3.ggpht.com/ytc/AGIKgqOK6yA-HYL70-WVzQ6PyG9v04eRSo80GLQTkoBuUw=s88-c-k-c0x00ffffff-no-rj",
        },
        duration: "PT14M47S",
        thumbnail: "https://i.ytimg.com/vi/48h57PspBec/maxresdefault.jpg",
        views: 55252258,
    };
    return (
        <div className="flex flex-col gap-4">
            {new Array(20).fill(data).map(() => (
                <VideoRecommendationCard {...data} />
            ))}
        </div>
    );
};

export default VideoRecommendations;
