import type { User } from "@ps/domain/schedule/user/User.ts";
import type { LoginService } from "@ps/domain/schedule/user/login/LoginService.ts";

export class LoginServiceMock implements LoginService {
    constructor(private readonly user: User) {}

    public login(): Promise<User> {
        return Promise.resolve(this.user);
    }
}
