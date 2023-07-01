import type { User } from "../User.ts";
import type { CreateUserModel } from "./CreateUserModel.ts";

export type CreateUserService = {
    readonly create: (user: CreateUserModel) => User;
};
