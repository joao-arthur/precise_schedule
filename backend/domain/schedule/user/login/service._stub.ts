import type { Session } from "../../../session/model.ts";
import type { UserLoginService } from "./service.ts";

export class UserLoginServiceStub implements UserLoginService {
    constructor(private readonly session: Session) {}

    public userLogin(): Promise<Session> {
        return Promise.resolve(this.session);
    }
}
