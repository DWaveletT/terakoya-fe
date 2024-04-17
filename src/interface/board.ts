import type { BoardId } from "./enum";

interface Board {
    id: BoardId;

    name: string;
    description: string;
}

export type { Board };