import type { User } from "../model.ts";
import type { UserUpdateFactory } from "./factory.ts";

export class UserUpdateFactoryStub implements UserUpdateFactory {
    constructor(private readonly user: User) {}

    public build(): User {
        return this.user;
    }
}
