import type { Result } from "../../lang/result.ts";
import type { IdGenerator } from "../../generator/id.ts";
import type { DateGenerator } from "../../generator/date.ts";
import type { Schema } from "../../validation/schema.ts";
import type { RepoError } from "../../repo.ts";
import type { ValidationError } from "../../validation/validate.ts";
import type { Session } from "../../session/service.ts";
import type { SessionService } from "../../session/service.ts";
import type { EmailAlreadyRegistered, UsernameAlreadyRegistered } from "./uniqueInfo.ts";
import type { UserRepo } from "./repo.ts";
import type { User } from "./model.ts";
import { validateSchema } from "../../validation/validate.ts";
import { userNewValidateUnique } from "./uniqueInfo.ts";

export type UserCreate = {
    readonly email: User["email"];
    readonly firstName: User["firstName"];
    readonly birthdate: User["birthdate"];
    readonly username: User["username"];
    readonly password: User["password"];
};

export const userCreateSchema: Schema<UserCreate> = {
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

export function userCreateToUser(
    user: UserCreate,
    id: User["id"],
    now: Date,
): User {
    return {
        id,
        email: user.email,
        firstName: user.firstName,
        birthdate: user.birthdate,
        username: user.username,
        password: user.password,
        createdAt: now,
        updatedAt: now,
    };
}

type UserCreateErrors =
    | RepoError
    | ValidationError
    | UsernameAlreadyRegistered
    | EmailAlreadyRegistered;

export async function userCreateService(
    repo: UserRepo,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator,
    sessionService: SessionService,
    user: UserCreate,
): Promise<Result<Session, UserCreateErrors>> {
    const schemaValidation = validateSchema(userCreateSchema, user);
    if (schemaValidation.type === "err") {
        return schemaValidation;
    }
    const validationInfoResult = await userNewValidateUnique(repo, user);
    if (validationInfoResult.type === "err") {
        return validationInfoResult;
    }
    const id = idGenerator.gen();
    const now = dateGenerator.gen();
    const builtUser = userCreateToUser(user, id, now);
    const createUserResult = await repo.cCreate(builtUser);
    if (createUserResult.type === "err") {
        return createUserResult;
    }
    return sessionService.create(builtUser.id);
}
