import type { IdGenerator } from "@ps/domain/generation/IdGenerator.ts";
import type { User } from "@ps/domain/schedule/user/User.ts";
import type { CreateUserFactory } from "@ps/domain/schedule/user/create/CreateUserFactory.ts";
import type { CreateUserModel } from "@ps/domain/schedule/user/create/CreateUserModel.ts";

export class CreateUserFactoryImpl implements CreateUserFactory {
    constructor(private readonly idGenerator: IdGenerator) {}

    public build(user: CreateUserModel): User {
        return {
            id: this.idGenerator.generate(),
            email: user.email,
            username: user.username,
            password: user.password,
        };
    }
}
