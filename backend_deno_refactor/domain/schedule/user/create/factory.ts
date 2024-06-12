import type { User } from "../model.ts";
import type { UserCreateModel } from "./model.ts";

export function buildUser(
    user: UserCreateModel,
    id: User["id"],
): User {
    return {
        id,
        email: user.email,
        firstName: user.firstName,
        birthdate: user.birthdate,
        username: user.username,
        password: user.password,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
}
