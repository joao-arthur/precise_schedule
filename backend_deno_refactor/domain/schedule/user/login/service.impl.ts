import type { Result } from "../../../lang/result.ts";
import type { ValidatorService } from "../../../validation/validator/service.ts";
import type { Session } from "../../../session/model.ts";
import type { SessionCreateService } from "../../../session/create/service.ts";
import type { UserFindService } from "../find/service.ts";
import type { UserLoginModel } from "./model.ts";
import type { UserLoginErrors, UserLoginService } from "./service.ts";
import { userLoginSchema } from "./validation.ts";

export class UserLoginServiceImpl implements UserLoginService {
    constructor(
        private readonly validator: ValidatorService,
        private readonly userFindService: UserFindService,
        private readonly sessionCreateService: SessionCreateService,
    ) {}

    public async userLogin(user: UserLoginModel): Promise<Result<Session, UserLoginErrors>> {
        const validationResult = this.validator.validate(user, userLoginSchema);
        if (validationResult.type === "err") {
            return validationResult;
        }
        const existingUserResult = await this.userFindService.findByCredentials(
            user.username,
            user.password,
        );
        if (existingUserResult.type === "err") {
            return existingUserResult;
        }
        return this.sessionCreateService.create(existingUserResult.data.id);
    }
}
