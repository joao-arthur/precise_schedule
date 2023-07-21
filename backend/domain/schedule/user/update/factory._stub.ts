import type { User } from "@ps/domain/schedule/user/User.ts";
import type { UpdateUserFactory } from "@ps/domain/schedule/user/update/UpdateUserFactory.ts";

export class UpdateUserFactoryMock implements UpdateUserFactory {
    constructor(private readonly user: User) {}

    public build(): User {
        return this.user;
    }
}
