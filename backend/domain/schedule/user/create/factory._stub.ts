import type { User } from "../model.ts";
import type { UserCreateFactory } from "./factory.ts";

export class UserCreateFactoryStub implements UserCreateFactory {
    constructor(private readonly user: User) {}

    public build(): User {
        return this.user;
    }
}
