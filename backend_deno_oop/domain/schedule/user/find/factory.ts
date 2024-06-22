import type { User } from "../model.ts";
import type { UserFindModel } from "./model.ts";

export type UserFindFactory = {
    readonly build: (user: User) => UserFindModel;
};
