import type { Result } from "../../../lang/result.ts";
import type { User } from "../model.ts";
import type { UserUniqueInfoModel } from "./model.ts";
import type { UserUniqueInfoErrors, UserUniqueInfoService } from "./service.ts";
import type { UserUniqueInfoRepository } from "./repository.ts";
import { buildErr, buildOk } from "../../../lang/result.ts";
import { EmailAlreadyRegistered } from "./error.emailAlreadyRegistered.ts";
import { UsernameAlreadyRegistered } from "./error.usernameAlreadyRegistered.ts";

export class UserUniqueInfoServiceImpl implements UserUniqueInfoService {
    constructor(private readonly repository: UserUniqueInfoRepository) {}

    public async validateNew(
        user: UserUniqueInfoModel,
    ): Promise<Result<void, UserUniqueInfoErrors>> {
        const countUsername = await this.repository.countUsername(user.username);
        if (countUsername.type === "err") {
            return buildErr(countUsername.error);
        }
        if (countUsername.data > 0) {
            return buildErr(new UsernameAlreadyRegistered());
        }
        const countEmail = await this.repository.countEmail(user.email);
        if (countEmail.type === "err") {
            return buildErr(countEmail.error);
        }
        if (countEmail.data > 0) {
            return buildErr(new EmailAlreadyRegistered());
        }
        return buildOk(undefined);
    }

    public async validateExisting(
        user: UserUniqueInfoModel,
        oldUser: User,
    ): Promise<Result<void, UserUniqueInfoErrors>> {
        const countUsername = await this.repository.countUsername(user.username);
        if (countUsername.type === "err") {
            return buildErr(countUsername.error);
        }
        if (countUsername.data > 0 && user.username !== oldUser.username) {
            return buildErr(new UsernameAlreadyRegistered());
        }
        const countEmail = await this.repository.countEmail(user.email);
        if (countEmail.type === "err") {
            return buildErr(countEmail.error);
        }
        if (countEmail.data > 0 && user.email !== oldUser.email) {
            return buildErr(new EmailAlreadyRegistered());
        }
        return buildOk(undefined);
    }
}
