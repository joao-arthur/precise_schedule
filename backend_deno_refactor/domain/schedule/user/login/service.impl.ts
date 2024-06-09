import type { ValidatorService } from "../../../validation/validator/service.ts";
import type { Session } from "../../../session/model.ts";
import type { SessionCreateService } from "../../../session/create/service.ts";
import type { UserFindService } from "../find/service.ts";
import type { UserLoginModel } from "./model.ts";
import type { UserLoginService } from "./service.ts";

import { buildErr, buildOk } from "../../../lang/result.ts";
import { userLoginValidation } from "./validation.ts";

export class UserLoginServiceImpl implements UserLoginService {
    constructor(
        private readonly validator: ValidatorService,
        private readonly userFindService: UserFindService,
        private readonly sessionCreateService: SessionCreateService,
    ) {}

    public async userLogin(user: UserLoginModel): Promise<Session> {
        const modelValidation = this.validator.validate(user, userLoginValidation);
        if (modelValidation.type === "err") {
            return buildErr(modelValidation.error);
        }
        const existingUser = await this.userFindService.findByCredentials(
            user.username,
            user.password,
        );
        return this.sessionCreateService.create(existingUser.id);
    }
}
