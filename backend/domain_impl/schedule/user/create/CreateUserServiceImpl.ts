import type { Validator } from "@ps/domain/validation/Validator.ts";
import type { User } from "@ps/domain/schedule/user/User.ts";
import type { UniqueInfoService } from "@ps/domain/schedule/user/uniqueInfo/UniqueInfoService.ts";
import type { CreateUserModel } from "@ps/domain/schedule/user/create/CreateUserModel.ts";
import type { CreateUserRepository } from "@ps/domain/schedule/user/create/CreateUserRepository.ts";
import type { CreateUserService } from "@ps/domain/schedule/user/create/CreateUserService.ts";

import { createUserValidation } from "@ps/domain/schedule/user/create/createUserValidation.ts";
import { CreateUserFactory } from "@ps/domain/schedule/user/create/CreateUserFactory.ts";

export class CreateUserServiceImpl implements CreateUserService {
    constructor(
        private readonly repository: CreateUserRepository,
        private readonly uniqueInfoService: UniqueInfoService,
        private readonly factory: CreateUserFactory,
        private readonly validator: Validator,
    ) {}

    public async create(user: CreateUserModel): Promise<User> {
        this.validator.validate(user, createUserValidation);
        await this.uniqueInfoService.validateNew(user);
        const buildedUser = this.factory.build(user);
        await this.repository.create(buildedUser);
        return buildedUser;
    }
}
