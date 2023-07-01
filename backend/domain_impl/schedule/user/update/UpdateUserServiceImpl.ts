import type { Validator } from "@ps/domain/validation/Validator.ts";
import type { User } from "@ps/domain/schedule/user/User.ts";
import type { UniqueInfoService } from "@ps/domain/schedule/user/uniqueInfo/UniqueInfoService.ts";
import type { FindUserService } from "@ps/domain/schedule/user/find/FindUserService.ts";
import type { UpdateUserFactory } from "@ps/domain/schedule/user/update/UpdateUserFactory.ts";
import type { UpdateUserModel } from "@ps/domain/schedule/user/update/UpdateUserModel.ts";
import type { UpdateUserRepository } from "@ps/domain/schedule/user/update/UpdateUserRepository.ts";
import type { UpdateUserService } from "@ps/domain/schedule/user/update/UpdateUserService.ts";

import { updateUserValidation } from "@ps/domain/schedule/user/update/updateUserValidation.ts";

export class UpdateUserServiceImpl implements UpdateUserService {
    constructor(
        private readonly repository: UpdateUserRepository,
        private readonly unique: UniqueInfoService,
        private readonly factory: UpdateUserFactory,
        private readonly validator: Validator,
        private readonly userFinder: FindUserService,
    ) {}

    public update(id: User["id"], user: UpdateUserModel): User {
        this.validator.validate(user, updateUserValidation);
        const existingUser = this.userFinder.findById(id);
        this.unique.validateExisting(user, existingUser);
        const userToUpdate = this.factory.build(user, id);
        this.repository.update(userToUpdate);
        return userToUpdate;
    }
}
