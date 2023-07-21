import type { User } from "@ps/domain/schedule/user/User.ts";
import type { CreateUserFactory } from "@ps/domain/schedule/user/create/CreateUserFactory.ts";

export class CreateUserFactoryMock implements CreateUserFactory {
    constructor(private readonly user: User) {}

    public build(): User {
        return this.user;
    }
}
