import type { Result } from "@ps/domain/lang/result.ts";
import type { RepositoryError } from "@ps/domain/repository/RepositoryError.ts";
import type { User } from "@ps/domain/schedule/user/model.ts";
import type { UserRepository } from "@ps/domain/schedule/user/repository.ts";

import { buildOk } from "@ps/domain/lang/result.ts";

export class UserRepositoryMemory implements UserRepository {
    private readonly users: User[] = [];

    public create(user: User): Promise<Result<void, RepositoryError>> {
        this.users.push(user);
        return Promise.resolve(buildOk(undefined));
    }

    public update(userToUpdate: User): Promise<Result<void, RepositoryError>> {
        const index = this.users.findIndex((user) => user.id === userToUpdate.id);
        this.users.splice(index, 1, userToUpdate);
        return Promise.resolve(buildOk(undefined));
    }

    public findById(id: User["id"]): Promise<Result<User | undefined, RepositoryError>> {
        const user = this.users.find((user) => user.id === id);
        return Promise.resolve(buildOk(user));
    }

    public findByCredentials(
        username: User["username"],
        password: User["password"],
    ): Promise<Result<User | undefined, RepositoryError>> {
        const user = this.users.find((user) =>
            user.username === username && user.password === password
        );
        return Promise.resolve(buildOk(user));
    }

    public countUsername(
        username: User["username"],
    ): Promise<Result<number, RepositoryError>> {
        const count = this.users.reduce((acc, curr) => acc + Number(curr.username === username), 0);
        return Promise.resolve(buildOk(count));
    }

    public countEmail(
        email: User["email"],
    ): Promise<Result<number, RepositoryError>> {
        const count = this.users.reduce((acc, curr) => acc + Number(curr.email === email), 0);
        return Promise.resolve(buildOk(count));
    }
}
