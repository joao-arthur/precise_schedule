import type { User } from "../model.ts";
import type { UserUpdateModel } from "./model.ts";
import type { UserUpdateFactory } from "./factory.ts";

export class UserUpdateFactoryImpl implements UserUpdateFactory {
    public build(user: UserUpdateModel, existingUser: User): User {
        return {
            id: existingUser.id,
            email: user.email,
            firstName: user.firstName,
            birthdate: user.birthdate,
            username: user.username,
            password: user.password,
            createdAt: existingUser.createdAt,
            updatedAt: new Date(),
        };
    }
}
