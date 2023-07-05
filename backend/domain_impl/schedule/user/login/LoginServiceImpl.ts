import type { Validator } from "@ps/domain/validation/Validator.ts";
import type { Session } from "@ps/domain/session/Session.ts";
import type { FindUserService } from "@ps/domain/schedule/user/find/FindUserService.ts";
import type { LoginModel } from "@ps/domain/schedule/user/login/LoginModel.ts";
import type { LoginService } from "@ps/domain/schedule/user/login/LoginService.ts";

import { loginValidation } from "@ps/domain/schedule/user/login/loginValidation.ts";

export class LoginServiceImpl implements LoginService {
    constructor(
        private readonly validator: Validator,
        private readonly findService: FindUserService,
    ) {}

    public async login(user: LoginModel): Promise<Session> {
        this.validator.validate(user, loginValidation);
        const existingUser = await this.findService.findByCredentials(
            user.username,
            user.password,
        );
        return { token: "mock token" };
    }
}
