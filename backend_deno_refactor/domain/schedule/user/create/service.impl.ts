import type { IdGenerator } from "../../../generator/id/service.ts";
import type { Result } from "../../../lang/result.ts";
import type { ValidatorService } from "../../../validation/validator/service.ts";
import type { Session } from "../../../session/model.ts";
import type { SessionCreateService } from "../../../session/create/service.ts";
import type { UserUniqueInfoService } from "../uniqueInfo/service.ts";
import type { UserCreateModel } from "./model.ts";
import type { UserCreateRepository } from "./repository.ts";
import type { UserCreateErrors, UserCreateService } from "./service.ts";
import { buildUser } from "./factory.ts";
import { userCreateSchema } from "./validation.ts";

export class UserCreateServiceImpl implements UserCreateService {
    constructor(
        private readonly repository: UserCreateRepository,
        private readonly idGenerator: IdGenerator,
        private readonly uniqueInfoService: UserUniqueInfoService,
        private readonly sessionCreateService: SessionCreateService,
        private readonly validator: ValidatorService,
    ) {}

    public async create(
        user: UserCreateModel,
    ): Promise<Result<Session, UserCreateErrors>> {
        const validationResult = this.validator.validate(user, userCreateSchema);
        if (validationResult.type === "err") {
            return validationResult;
        }
        const validationInfoResult = await this.uniqueInfoService.validateNew(user);
        if (validationInfoResult.type === "err") {
            return validationInfoResult;
        }
        const id = this.idGenerator.generate();
        const builtUser = buildUser(user, id);
        await this.repository.create(builtUser);
        return this.sessionCreateService.create(builtUser.id);
    }
}
