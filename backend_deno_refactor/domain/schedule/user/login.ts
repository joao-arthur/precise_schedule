import type { Result } from "../../lang/result.ts";
import type { Schema } from "../../validation/schema.ts";
import type { RepoError } from "../../repository/repo.ts";
import type { ValidationError } from "../../validation/validate.ts";
import type { Session } from "../../session/model.ts";
import type { SessionCreateService } from "../../session/create.ts";
import type { UserRepo } from "./repo.ts";
import type { User } from "./model.ts";
import type { UserNotFound } from "./read.ts";
import { userReadByCredentials } from "./read.ts";
import { validateSchema } from "../../validation/validate.ts";

export type UserLogin = {
    readonly username: User["username"];
    readonly password: User["password"];
};

const userLoginSchema: Schema<UserLogin> = {
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

type UserLoginErrors =
    | RepoError
    | ValidationError
    | UserNotFound;

export async function userLogin(
    repo: UserRepo,
    sessionCreateService: SessionCreateService,
    user: UserLogin,
): Promise<Result<Session, UserLoginErrors>> {
    const schemaValidation = validateSchema(userLoginSchema, user);
    if (schemaValidation.type === "err") {
        return schemaValidation;
    }
    const existingUserResult = await userReadByCredentials(
        repo,
        user.username,
        user.password,
    );
    if (existingUserResult.type === "err") {
        return existingUserResult;
    }
    return sessionCreateService.create(existingUserResult.data.id);
}
