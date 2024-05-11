import type { UserId } from "./enum";

interface BgUser {
    uid: UserId,

    username: string,
    password: string,
    role: number,
}

interface User {
    id: UserId,

    name: string,
    role: number,
}

export type { User, BgUser };