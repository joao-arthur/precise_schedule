import type { Validator } from "@ps/domain/validation/Validator.ts";
import type { User } from "@ps/domain/schedule/user/User.ts";
import type { FindUserService } from "@ps/domain/schedule/user/find/FindUserService.ts";
import type { LoginModel } from "@ps/domain/schedule/user/login/LoginModel.ts";
import type { LoginService } from "@ps/domain/schedule/user/login/LoginService.ts";

import { loginValidation } from "@ps/domain/schedule/user/login/loginValidation.ts";

export class LoginServiceImpl implements LoginService {
    constructor(
        private readonly validator: Validator,
        private readonly userFinder: FindUserService,
    ) {}

    public login(user: LoginModel): User {
        this.validator.validate(user, loginValidation);
        const existingUser = this.userFinder.findByCredentials(
            user.username,
            user.password,
        );
        return existingUser;
    }
}
