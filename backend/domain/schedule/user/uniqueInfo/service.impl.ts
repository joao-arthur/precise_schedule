import type { User } from "../model.ts";
import type { UserUniqueInfoModel } from "./model.ts";
import type { UserUniqueInfoService } from "./service.ts";
import type { UserUniqueInfoRepository } from "./repository.ts";

import { EmailAlreadyRegistered } from "./EmailAlreadyRegistered.ts";
import { UsernameAlreadyRegistered } from "./UsernameAlreadyRegistered.ts";

export class UserUniqueInfoServiceImpl implements UserUniqueInfoService {
    constructor(private readonly repository: UserUniqueInfoRepository) {}

    public async validateNew(user: UserUniqueInfoModel): Promise<void> {
        const countUsername = await this.repository.countUsername(user.username);
        if (countUsername > 0) {
            throw new UsernameAlreadyRegistered();
        }
        const countEmail = await this.repository.countEmail(user.email);
        if (countEmail > 0) {
            throw new EmailAlreadyRegistered();
        }
    }

    public async validateExisting(
        user: UserUniqueInfoModel,
        oldUser: User,
    ): Promise<void> {
        const countUsername = await this.repository.countUsername(user.username);
        if (countUsername > 0 && user.username !== oldUser.username) {
            throw new UsernameAlreadyRegistered();
        }
        const countEmail = await this.repository.countEmail(user.email);
        if (countEmail > 0 && user.email !== oldUser.email) {
            throw new EmailAlreadyRegistered();
        }
    }
}
