import type { Result } from "../../../lang/result.ts";
import type { ValidatorService } from "../../../validation/validator/service.ts";
import type { User } from "../model.ts";
import type { UserUniqueInfoService } from "../uniqueInfo/service.ts";
import type { UserFindService } from "../find/service.ts";
import type { UserUpdateModel } from "./model.ts";
import type { UserUpdateService } from "./service.ts";
import type { UserUpdateFactory } from "./factory.ts";
import type { UserUpdateRepository } from "./repository.ts";
import { buildOk } from "../../../lang/result.ts";
import { userUpdateValidation } from "./validation.ts";

export class UserUpdateServiceImpl implements UserUpdateService {
    constructor(
        private readonly repository: UserUpdateRepository,
        private readonly uniqueInfoService: UserUniqueInfoService,
        private readonly factory: UserUpdateFactory,
        private readonly validator: ValidatorService,
        private readonly userFindService: UserFindService,
    ) {}

    public async update(
        id: User["id"],
        user: UserUpdateModel,
    ): Promise<Result<User>> {
        const validationResult = this.validator.validate(user, userUpdateValidation);
        if (validationResult.type === "err") {
            return validationResult;
        }
        const existingUser = await this.userFindService.findById(id);
        if (existingUser.type === "err") {
            return existingUser;
        }
        await this.uniqueInfoService.validateExisting(user, existingUser.data);
        const userToUpdate = this.factory.build(user, existingUser.data);
        await this.repository.update(userToUpdate);
        return buildOk(userToUpdate);
    }
}
