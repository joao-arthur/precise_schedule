import type { User } from "../model.ts";
import type { UserUpdateModel } from "./model.ts";

export type UserUpdateFactory = {
    readonly build: (user: UserUpdateModel, existingUser: User) => User;
};
