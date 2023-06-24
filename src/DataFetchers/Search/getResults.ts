import axiosInstance from "..";

interface GetSearchResultsData {
    searchQuery?: string;
    channelId?: string;
    nextPageToken?: string;
    order?: string;
}

const getSearchResults = async ({
    searchQuery,
    nextPageToken,
    channelId,
    order,
}: GetSearchResultsData) =>
    await axiosInstance.get("search", {
        params: {
            part: "snippet",
            maxResults: 50,
            pageToken: nextPageToken,
            q: searchQuery,
            channelId,
            order,
            type: "video",
            key: import.meta.env.VITE_YOUTUBE_API_KEY,
        },
    });

export default getSearchResults;
