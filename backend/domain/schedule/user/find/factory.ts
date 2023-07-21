import type { User } from "../../user/User.ts";
import type { FindUserModel } from "./FindUserModel.ts";

export type FindUserFactory = {
    readonly build: (user: User) => FindUserModel;
};
