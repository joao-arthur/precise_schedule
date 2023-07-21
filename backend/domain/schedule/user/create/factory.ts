import type { User } from "../User.ts";
import type { CreateUserModel } from "./CreateUserModel.ts";

export type CreateUserFactory = {
    readonly build: (user: CreateUserModel) => User;
};
