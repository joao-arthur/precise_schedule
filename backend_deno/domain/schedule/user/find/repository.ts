import type { User } from "../model.ts";

export type UserFindRepository = {
    readonly findById: (id: User["id"]) => Promise<User | undefined>;
    readonly findByCredentials: (
        username: User["username"],
        password: User["password"],
    ) => Promise<User | undefined>;
};
