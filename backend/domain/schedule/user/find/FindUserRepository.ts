import type { User } from "../User.ts";

export type FindUserRepository = {
    readonly findById: (id: User["id"]) => Promise<User | undefined>;
    readonly findByCredentials: (
        username: User["username"],
        password: User["password"],
    ) => Promise<User | undefined>;
};
