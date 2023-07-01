import type { User } from "../User.ts";

export type FindUserService = {
    readonly findById: (id: User["id"]) => User;
    readonly findByCredentials: (
        username: User["username"],
        password: User["password"],
    ) => User;
};
