import type { User } from "../model.ts";

export type UserFindService = {
    readonly findById: (id: User["id"]) => Promise<User>;
    readonly findByCredentials: (
        username: User["username"],
        password: User["password"],
    ) => Promise<User>;
};
