import type { User } from "@ps/domain/schedule/user/User.ts";
import type { UserRepository } from "@ps/domain/schedule/user/UserRepository.ts";

export class UserRepositoryMemory implements UserRepository {
    private readonly users: User[] = [];

    public create(user: User): Promise<void> {
        this.users.push(user);
        return Promise.resolve();
    }

    public update(userToUpdate: User): Promise<void> {
        this.users.splice(
            this.users.findIndex((user) => user.id === userToUpdate.id),
            1,
            userToUpdate,
        );
        return Promise.resolve();
    }

    public findById(id: User["id"]): Promise<User | undefined> {
        return Promise.resolve(
            this.users.find((user) => user.id === id),
        );
    }

    public findByCredentials(
        username: User["username"],
        password: User["password"],
    ): Promise<User | undefined> {
        return Promise.resolve(
            this.users.find((user) => user.username === username && user.password === password),
        );
    }

    public countUsername(
        username: User["username"],
    ): Promise<number> {
        return Promise.resolve(this.users.reduce(
            (acc, curr) => acc + Number(curr.username === username),
            0,
        ));
    }

    public countEmail(email: User["email"]): Promise<number> {
        return Promise.resolve(this.users.reduce(
            (acc, curr) => acc + Number(curr.email === email),
            0,
        ));
    }
}
