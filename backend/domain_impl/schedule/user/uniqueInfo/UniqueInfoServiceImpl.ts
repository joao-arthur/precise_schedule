import type { User } from "@ps/domain/schedule/user/User.ts";
import type { UniqueInfoModel } from "@ps/domain/schedule/user/uniqueInfo/UniqueInfoModel.ts";
import type { UniqueInfoRepository } from "@ps/domain/schedule/user/uniqueInfo/UniqueInfoRepository.ts";
import type { UniqueInfoService } from "@ps/domain/schedule/user/uniqueInfo/UniqueInfoService.ts";

import { EmailAlreadyRegistered } from "@ps/domain/schedule/user/uniqueInfo/EmailAlreadyRegistered.ts";
import { UsernameAlreadyRegistered } from "@ps/domain/schedule/user/uniqueInfo/UsernameAlreadyRegistered.ts";

export class UniqueInfoServiceImpl implements UniqueInfoService {
    constructor(private readonly repository: UniqueInfoRepository) {}

    validateNew(user: UniqueInfoModel): void {
        const countUsername = this.repository.countUsername(
            user.username,
        );
        if (countUsername > 0) {
            throw new UsernameAlreadyRegistered();
        }
        const countEmail = this.repository.countEmail(user.email);
        if (countEmail > 0) {
            throw new EmailAlreadyRegistered();
        }
    }

    validateExisting(user: UniqueInfoModel, oldUser: User): void {
        const countUsername = this.repository.countUsername(
            user.username,
        );
        if (countUsername > 0 && user.username !== oldUser.username) {
            throw new UsernameAlreadyRegistered();
        }
        const countEmail = this.repository.countEmail(user.email);
        if (countEmail > 0 && user.email !== oldUser.email) {
            throw new EmailAlreadyRegistered();
        }
    }
}
