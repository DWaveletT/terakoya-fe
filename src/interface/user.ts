import type { UserId } from "./enum";

interface User {
    id: UserId,

    name: string,
    status: number,
    avatar: string,
}

export type { User };