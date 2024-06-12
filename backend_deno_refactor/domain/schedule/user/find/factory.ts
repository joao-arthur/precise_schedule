import type { User } from "../model.ts";
import type { UserFindModel } from "./model.ts";

export function buildUserFind(user: User): UserFindModel {
    return {
        firstName: user.firstName,
        birthdate: user.birthdate,
        email: user.email,
        username: user.username,
    };
}
