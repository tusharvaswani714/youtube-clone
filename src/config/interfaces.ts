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
        thumbnails: Record<
            string,
            {
                url: string;
                width: number;
                height: number;
            }
        >;
    };
    contentDetails: {
        duration: string;
    };
    statistics: {
        viewCount: number;
    };
}

// channel details

export interface FetchedChannelDetails {
    id: string;
    snippet: {
        thumbnails: {
            default: {
                url: string;
            };
        };
    };
    statistics: {
        subscriberCount: number;
    };
}

// video details

export interface SearchResultFetchedVideoDetails {
    id: string;
    contentDetails: {
        duration: string;
    };
    statistics: {
        viewCount: string;
    };
}

// search result

export interface FetchedSearchResult {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        description: string;
        publishedAt: string;
        channelId: string;
        channelTitle: string;
        thumbnails: Record<
            string,
            {
                url: string;
                width: number;
                height: number;
            }
        >;
    };
}

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

// video details

export interface FetchedVideoDetails {
    id: string;
    player: {
        embedHtml: string;
    };
    snippet: {
        title: string;
        description: string;
        channelId: string;
        channelTitle: string;
        publishedAt: string;
    };
    statistics: {
        likeCount: number;
        viewCount: number;
        commentCount: number;
    };
}

export interface AuthorChannelDetails {
    id: string;
    name: string;
    profileURL: string;
    totalSubscribers: number;
}

export interface VideoDetails {
    id: string;
    title: string;
    desc: string;
    authorChannelDetails: AuthorChannelDetails;
    publishedAt: string;
    likeCount: number;
    viewCount: number;
    commentCount: number;
}

// video recommendation

export interface VideoRecommendation {
    id: string;
    title: string;
    publishedAt: string;
    channel: {
        id: string;
        title: string;
    };
    duration: string;
    thumbnail: string;
    views: number;
}

// comment and replies

export interface FetchedComment {
    id: string;
    snippet: {
        topLevelComment: {
            snippet: {
                authorChannelId: {
                    value: string;
                };
                authorDisplayName: string;
                authorProfileImageUrl: string;
                textDisplay: string;
                publishedAt: string;
                updatedAt: string;
                likeCount: number;
            };
        };
        totalReplyCount: number;
    };
}

export interface FetchedCommentReply {
    id: string;
    snippet: {
        authorChannelId: {
            value: string;
        };
        authorDisplayName: string;
        authorProfileImageUrl: string;
        textDisplay: string;
        publishedAt: string;
        updatedAt: string;
        likeCount: number;
    };
}

export interface CommentOrCommentReplyAuthor {
    id: string;
    name: string;
    profileURL: string;
}

export interface CommentOrCommentReplyCommon {
    id: string;
    author: CommentOrCommentReplyAuthor;
    content: string;
    numOfLikes: number;
    publishedAt: string;
    updatedAt: string;
}

export type CommentOrCommentReply = CommentOrCommentReplyCommon &
    (
        | {
              numOfReplies: number;
              reply: false;
          }
        | {
              reply: true;
          }
    );
