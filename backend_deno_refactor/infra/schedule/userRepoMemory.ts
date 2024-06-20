import type { Result } from "../../domain/lang/result.ts";
import type { RepoError } from "../../domain/repo.ts";
import type { User } from "../../domain/schedule/user/model.ts";
import type { UserRepo } from "../../domain/schedule/user/repo.ts";
import { ok } from "../../domain/lang/result.ts";

export function userRepoMemory(): UserRepo {
    const users: User[] = [];

    return {
        cCreate: (user): Promise<Result<void, RepoError>> => {
            users.push(user);
            return Promise.resolve(ok(undefined));
        },
        cUpdate: (userToUpdate: User): Promise<Result<void, RepoError>> => {
            const index = users.findIndex((user) => user.id === userToUpdate.id);
            users.splice(index, 1, userToUpdate);
            return Promise.resolve(ok(undefined));
        },
        cReadById: (id: User["id"]): Promise<Result<User | undefined, RepoError>> => {
            const user = users.find((user) => user.id === id);
            return Promise.resolve(ok(user));
        },
        cReadByCredentials: (
            username: User["username"],
            password: User["password"],
        ): Promise<Result<User | undefined, RepoError>> => {
            const user = users.find((user) =>
                user.username === username && user.password === password
            );
            return Promise.resolve(ok(user));
        },
        cCountUsername: (
            username: User["username"],
        ): Promise<Result<number, RepoError>> => {
            const count = users.reduce((acc, curr) => acc + Number(curr.username === username), 0);
            return Promise.resolve(ok(count));
        },
        cCountEmail: (
            email: User["email"],
        ): Promise<Result<number, RepoError>> => {
            const count = users.reduce((acc, curr) => acc + Number(curr.email === email), 0);
            return Promise.resolve(ok(count));
        },
    };
}
