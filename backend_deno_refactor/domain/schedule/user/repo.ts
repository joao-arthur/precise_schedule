import type { Op } from "../../repository/repo.ts";
import type { User } from "./model.ts";

export type UserRepo = {
    readonly cCreate: (user: User) => Op<void>;
    readonly cUpdate: (user: User) => Op<void>;
    readonly cReadById: (id: User["id"]) => Op<User | undefined>;
    readonly cReadByCredentials: (
        username: User["username"],
        password: User["password"],
    ) => Op<User | undefined>;
    readonly cCountUsername: (username: User["username"]) => Op<number>;
    readonly cCountEmail: (email: User["email"]) => Op<number>;
};
