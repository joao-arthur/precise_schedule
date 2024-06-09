import type { IdGenerator } from "../../../generator/id/service.ts";
import type { User } from "../model.ts";
import type { UserCreateFactory } from "./factory.ts";
import type { UserCreateModel } from "./model.ts";

export class UserCreateFactoryImpl implements UserCreateFactory {
    constructor(private readonly idGenerator: IdGenerator) {}

    public build(user: UserCreateModel): User {
        return {
            id: this.idGenerator.generate(),
            email: user.email,
            firstName: user.firstName,
            birthdate: user.birthdate,
            username: user.username,
            password: user.password,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}
