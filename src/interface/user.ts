import type { UserId } from "./enum";

interface User {
    id: UserId,

    name: string,
    role: number,
}

export type { User };