import type { IdGenerator } from "../../generator/id.ts";
import type { Result } from "../../lang/result.ts";
import type { Schema } from "../../validation/schema.ts";
import type { RepoError } from "../../repository/repo.ts";
import type { ValidationError } from "../../validation/ValidationError.ts";
import type { Session } from "../../session/model.ts";
import type { SessionCreateService } from "../../session/create.ts";
import type { EmailAlreadyRegistered, UsernameAlreadyRegistered } from "./uniqueInfo.ts";
import type { UserRepo } from "./repo.ts";
import type { User } from "./model.ts";
import { validateSchema } from "../../../validation/validate.ts";
import { userUniqueInfoValidateNew } from "./uniqueInfo.ts";

export type UserCreateModel = {
    readonly email: User["email"];
    readonly firstName: User["firstName"];
    readonly birthdate: User["birthdate"];
    readonly username: User["username"];
    readonly password: User["password"];
};

export const userCreateSchema: Schema<UserCreateModel> = {
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

type UserCreateErrors =
    | RepoError
    | ValidationError
    | UsernameAlreadyRegistered
    | EmailAlreadyRegistered;

export async function userCreate(
    repo: UserRepo,
    idGenerator: IdGenerator,
    sessionCreateService: SessionCreateService,
    user: UserCreateModel,
): Promise<Result<Session, UserCreateErrors>> {
    const schemaValidation = validateSchema(userCreateSchema, user);
    if (schemaValidation.type === "err") {
        return schemaValidation;
    }
    const validationInfoResult = await userUniqueInfoValidateNew(repo, user);
    if (validationInfoResult.type === "err") {
        return validationInfoResult;
    }
    const id = idGenerator.gen();
    const builtUser = buildUser(user, id);
    const createUserResult = await repo.create(builtUser);
    if (createUserResult.type === "err") {
        return createUserResult;
    }
    return sessionCreateService.create(builtUser.id);
}
