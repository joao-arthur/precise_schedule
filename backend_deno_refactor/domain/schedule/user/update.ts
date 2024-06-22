import type { Result } from "../../lang/result.ts";
import type { RepoErr } from "../../repo.ts";
import type { Schema } from "../../validation/schema.ts";
import type { ValidationErr } from "../../validation/validate.ts";
import type { DateGenerator } from "../../generator/date.ts";
import type { UserNotFound } from "./read.ts";
import type { EmailAlreadyRegistered, UsernameAlreadyRegistered } from "./uniqueInfo.ts";
import type { UserRepo } from "./repo.ts";
import type { User } from "./model.ts";
import { ok } from "../../lang/result.ts";
import { validateSchema } from "../../validation/validate.ts";
import { userExistingValidateUnique } from "./uniqueInfo.ts";
import { userReadById } from "./read.ts";

export type UserUpdate = {
    readonly email: User["email"];
    readonly firstName: User["firstName"];
    readonly birthdate: User["birthdate"];
    readonly username: User["username"];
    readonly password: User["password"];
};

const userUpdateSchema: Schema<UserUpdate> = {
    firstName: [
        { type: "str" },
        { type: "strMinLen", min: 1 },
        { type: "strMaxLen", max: 256 },
    ],
    birthdate: [
        { type: "dt" },
        { type: "dtMin", min: "1970-01-01" },
    ],
    email: [
        { type: "email" },
        { type: "strMaxLen", max: 256 },
    ],
    username: [
        { type: "str" },
        { type: "strMinLen", min: 1 },
        { type: "strMaxLen", max: 32 },
    ],
    password: [
        { type: "str" },
        { type: "strMinLen", min: 8 },
        { type: "strMaxLen", max: 32 },
        { type: "strMinNum", min: 1 },
        { type: "strMinUpper", min: 1 },
        { type: "strMinLower", min: 1 },
        { type: "strMinSpecial", min: 1 },
    ],
};

export function userUpdateToUser(
    user: UserUpdate,
    existingUser: User,
    now: Date,
): User {
    return {
        id: existingUser.id,
        email: user.email,
        firstName: user.firstName,
        birthdate: user.birthdate,
        username: user.username,
        password: user.password,
        createdAt: existingUser.createdAt,
        updatedAt: now,
    };
}

type UserUpdateErrors =
    | RepoErr
    | ValidationErr
    | UserNotFound
    | UsernameAlreadyRegistered
    | EmailAlreadyRegistered;

export async function userUpdateService(
    repo: UserRepo,
    dateGenerator: DateGenerator,
    id: User["id"],
    user: UserUpdate,
): Promise<Result<User, UserUpdateErrors>> {
    const schemaValidation = validateSchema(userUpdateSchema, user);
    if (schemaValidation.type === "err") {
        return schemaValidation;
    }
    const existingUser = await userReadById(repo, id);
    if (existingUser.type === "err") {
        return existingUser;
    }
    const existingResult = await userExistingValidateUnique(repo, user, existingUser.data);
    if (existingResult.type === "err") {
        return existingResult;
    }
    const now = dateGenerator.gen();
    const builtUser = userUpdateToUser(user, existingUser.data, now);
    const updateResult = await repo.cUpdate(builtUser);
    if (updateResult.type === "err") {
        return updateResult;
    }
    return ok(builtUser);
}
