import type { User } from "../model.ts";
import type { UserCreateModel } from "./model.ts";

export type UserCreateFactory = {
    readonly build: (user: UserCreateModel) => User;
};
