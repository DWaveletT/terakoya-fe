import type { BoardId, PostId, ReplyId } from "./enum";
import type { User } from "./user";

interface Post {
    id: PostId,
    time: number,
    
    poster: User,

    board: BoardId,

    title: string,
    content: string,

    like: number,
    dislike: number,
};

interface Reply {
    id: ReplyId,
    time: number,
    
    replyer: User,

    post: PostId,

    content: string,

    like: number,
    dislike: number,
};

export type { Post, Reply };