import type { PostId, ReplyId } from "./enum";

interface Post {
    id: PostId,
    subject: number,

    poster: number,
    status: number,
    title: string,
    description: string,
};

interface Reply {
    id: ReplyId,
    content: string,
    like: number,
    dislike: number,
};

export type { Post, Reply };