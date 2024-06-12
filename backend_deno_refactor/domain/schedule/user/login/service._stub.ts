import type { Result } from "../../../lang/result.ts";
import type { Session } from "../../../session/model.ts";
import type { UserLoginErrors, UserLoginService } from "./service.ts";
import { ok } from "../../../lang/result.ts";

export class UserLoginServiceStub implements UserLoginService {
    constructor(private readonly session: Session) {}

    public userLogin(): Promise<Result<Session, UserLoginErrors>> {
        return Promise.resolve(ok(this.session));
    }
}
