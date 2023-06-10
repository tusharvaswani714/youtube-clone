import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3/",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
