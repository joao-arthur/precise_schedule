import type { User } from "@ps/domain/schedule/user/User.ts";
import type { UserRepository } from "@ps/domain/schedule/user/UserRepository.ts";

export class UserRepositoryMemory implements UserRepository {
    private readonly users: User[] = [];

    public create(user: User): void {
        this.users.push(user);
    }

    public update(userToUpdate: User): void {
        this.users.splice(
            this.users.findIndex((user) =>
                user.id === userToUpdate.id
            ),
            1,
            userToUpdate,
        );
    }

    public findById(id: User["id"]): User | undefined {
        return this.users.find((user) => user.id === id);
    }

    public findByCredentials(
        username: User["username"],
        email: User["email"],
    ): User | undefined {
        return this.users.find((user) =>
            user.username === username || user.email === email
        );
    }

    public countUsername(username: User["username"]): number {
        return this.users.reduce(
            (acc, curr) => acc + Number(curr.username === username),
            0,
        );
    }

    public countEmail(email: User["email"]): number {
        return this.users.reduce(
            (acc, curr) => acc + Number(curr.email === email),
            0,
        );
    }
}
