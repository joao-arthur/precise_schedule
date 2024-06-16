import type { IdGenerator } from "../../../generator/id/service.ts";
import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../validation/ValidationError.ts";
import type { UsernameAlreadyRegistered } from "../uniqueInfo/error.usernameAlreadyRegistered.ts";
import type { EmailAlreadyRegistered } from "../uniqueInfo/error.emailAlreadyRegistered.ts";
import type { ValidatorService } from "../../../validation/validator/service.ts";
import type { Session } from "../../../session/model.ts";
import type { SessionCreateService } from "../../../session/create/service.ts";
import type { UserCreateModel } from "./model.ts";
import type { UserCreateRepository } from "./repo.ts";
import { userUniqueInfoValidateNew } from "../uniqueInfo/service.ts";
import { buildUser } from "./factory.ts";
import { userCreateSchema } from "./schema.ts";

type UserCreateErrors =
    | RepositoryError
    | ValidationError
    | UsernameAlreadyRegistered
    | EmailAlreadyRegistered;

export async function userCreate(
    repo: UserCreateRepository,
    idGenerator: IdGenerator,
    sessionCreateService: SessionCreateService,
    validator: ValidatorService,
    user: UserCreateModel,
): Promise<Result<Session, UserCreateErrors>> {
    const validationResult = validator.validate(user, userCreateSchema);
    if (validationResult.type === "err") {
        return validationResult;
    }
    const validationInfoResult = await userUniqueInfoValidateNew(repo, user);
    if (validationInfoResult.type === "err") {
        return validationInfoResult;
    }
    const id = idGenerator.generate();
    const builtUser = buildUser(user, id);
    const createUserResult = await repo.create(builtUser);
    if (createUserResult.type === "err") {
        return createUserResult;
    }
    return sessionCreateService.create(builtUser.id);
}
