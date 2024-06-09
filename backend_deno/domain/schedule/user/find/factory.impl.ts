import type { User } from "../model.ts";
import type { UserFindFactory } from "./factory.ts";
import type { UserFindModel } from "./model.ts";

export class UserFindFactoryImpl implements UserFindFactory {
    public build(user: User): UserFindModel {
        return {
            firstName: user.firstName,
            birthdate: user.birthdate,
            email: user.email,
            username: user.username,
        };
    }
}
