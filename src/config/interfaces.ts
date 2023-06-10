// categories

export interface FetchedCategory {
    id: number;
    snippet: {
        title: string;
    };
}

export interface Category {
    id: number;
    name: string;
}

// feed

export interface Feed {
    id: string;
    title: string;
    publishedAt: string;
    channel: {
        id: string;
        title: string;
        thumbnail?: string;
    };
    duration: string;
    thumbnail: string;
    views: number;
}

export interface FetchedFeed {
    id: string;
    snippet: {
        title: string;
        publishedAt: string;
        channelId: string;
        channelTitle: string;
        thumbnails: {
            standard: {
                url: string;
            };
        };
    };
    contentDetails: {
        duration: string;
    };
    statistics: {
        viewCount: number;
    };
}

// channel details

export interface FetchedChannelDetail {
    id: string;
    snippet: {
        thumbnails: {
            default: {
                url: string;
            };
        };
    };
}

// video details

export interface FetchedVideoDetail {
    id: string;
    contentDetails: {
        duration: string;
    };
    statistics: {
        viewCount: string;
    };
}

// search result

export interface SearchResult {
    id: string;
    title: string;
    publishedAt: string;
    channel: {
        id: string;
        title: string;
        thumbnail?: string;
    };
    duration: string;
    thumbnail: string;
    views: number;
    desc: string;
}
