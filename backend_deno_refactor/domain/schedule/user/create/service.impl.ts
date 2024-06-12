import type { Result } from "../../../lang/result.ts";
import type { ValidatorService } from "../../../validation/validator/service.ts";
import type { Session } from "../../../session/model.ts";
import type { SessionCreateService } from "../../../session/create/service.ts";
import type { UserUniqueInfoService } from "../uniqueInfo/service.ts";
import type { UserCreateModel } from "./model.ts";
import type { UserCreateFactory } from "./factory.ts";
import type { UserCreateRepository } from "./repository.ts";
import type { UserCreateErrors, UserCreateService } from "./service.ts";
import { userCreateValidation } from "./validation.ts";

export class UserCreateServiceImpl implements UserCreateService {
    constructor(
        private readonly repository: UserCreateRepository,
        private readonly uniqueInfoService: UserUniqueInfoService,
        private readonly factory: UserCreateFactory,
        private readonly sessionCreateService: SessionCreateService,
        private readonly validator: ValidatorService,
    ) {}

    public async create(
        user: UserCreateModel,
    ): Promise<Result<Session, UserCreateErrors>> {
        const validationResult = this.validator.validate(user, userCreateValidation);
        if (validationResult.type === "err") {
            return validationResult;
        }
        const validationInfoResult = await this.uniqueInfoService.validateNew(user);
        if (validationInfoResult.type === "err") {
            return validationInfoResult;
        }
        const builtUser = this.factory.build(user);
        await this.repository.create(builtUser);
        return this.sessionCreateService.create(builtUser.id);
    }
}
