import type { Validator } from "../../../validation/service.ts";
import type { Session } from "../../../session/model.ts";
import type { SessionCreateService } from "../../../session/create/service.ts";
import type { UserUniqueInfoService } from "../uniqueInfo/service.ts";
import type { UserCreateModel } from "./model.ts";
import type { UserCreateService } from "./service.ts";
import type { UserCreateFactory } from "./factory.ts";
import type { UserCreateRepository } from "./repository.ts";

import { userCreateValidation } from "./validation.ts";

export class UserCreateServiceImpl implements UserCreateService {
    constructor(
        private readonly repository: UserCreateRepository,
        private readonly uniqueInfoService: UserUniqueInfoService,
        private readonly factory: UserCreateFactory,
        private readonly SessionCreateService: SessionCreateService,
        private readonly validator: Validator,
    ) {}

    public async create(user: UserCreateModel): Promise<Session> {
        this.validator.validate(user, userCreateValidation);
        await this.uniqueInfoService.validateNew(user);
        const buildedUser = this.factory.build(user);
        await this.repository.create(buildedUser);
        return this.SessionCreateService.create(buildedUser.id);
    }
}
