import axiosInstance from "..";

interface GetSearchResultsData {
    searchQuery: string;
    nextPageToken?: string;
}

const getSearchResults = async ({
    searchQuery,
    nextPageToken,
}: GetSearchResultsData) =>
    await axiosInstance.get("search", {
        params: {
            part: "snippet",
            maxResults: 50,
            pageToken: nextPageToken,
            q: searchQuery,
            type: "video",
            key: import.meta.env.VITE_YOUTUBE_API_KEY,
        },
    });

export default getSearchResults;
