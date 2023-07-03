import type { Session } from "@ps/domain/session/Session.ts";
import type { LoginService } from "@ps/domain/schedule/user/login/LoginService.ts";

export class LoginServiceMock implements LoginService {
    constructor(private readonly session: Session) {}

    public login(): Promise<Session> {
        return Promise.resolve(this.session);
    }
}
