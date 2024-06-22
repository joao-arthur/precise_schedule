import type { Result } from "./lang/result.ts";

export class RepoErr extends Error {
    constructor() {
        super("There was an error querying the data!");
    }
}

export type Op<Data> = Promise<Result<Data, RepoErr>>;
