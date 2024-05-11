import type { BoardId, PostId, ReplyId, UserId } from "./enum";
import type { User } from "./user";

interface BgPost {
    id: PostId,
    releasetime: number,
    replytime: number,
    
    posterid: UserId,

    board: BoardId,

    title: string,
    content: string,

    role: number,
    username: string
}

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

interface BgReply {
    id : number,
    replytime : number,
    replyer : number,
    role : number,
    postid : number,
    username: string,
    content: string,
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

export type { Post, Reply, BgPost, BgReply };