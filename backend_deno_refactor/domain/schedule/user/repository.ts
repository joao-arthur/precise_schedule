import type { Result } from "../../lang/result.ts";
import type { RepositoryError } from "../../repository/RepositoryError.ts";
import type { User } from "./model.ts";

type Op<Data> = Promise<Result<Data, RepositoryError>>;

export type UserRepo = {
    readonly cCreate: (user: User) => Op<void>;
    readonly cUpdate: (user: User) => Op<void>;
    readonly cFindById: (id: User["id"]) => Op<User | undefined>;
    readonly cFindByCredentials: (
        username: User["username"],
        password: User["password"],
    ) => Op<User | undefined>;
    readonly cCountUsername: (username: User["username"]) => Op<number>;
    readonly cCountEmail: (email: User["email"]) => Op<number>;
};
