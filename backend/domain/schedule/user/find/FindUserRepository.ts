import type { User } from "../User.ts";

export type FindUserRepository = {
    readonly findById: (id: User["id"]) => User | undefined;
    readonly findByCredentials: (
        username: User["username"],
        password: User["password"],
    ) => User | undefined;
};
