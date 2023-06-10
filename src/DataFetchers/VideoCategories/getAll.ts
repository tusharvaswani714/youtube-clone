import axiosInstance from "..";

const getAllVideoCategories = async () =>
    await axiosInstance.get("videoCategories", {
        params: {
            part: "snippet",
            regionCode: "US",
            key: import.meta.env.VITE_YOUTUBE_API_KEY,
        },
    });

export default getAllVideoCategories;
