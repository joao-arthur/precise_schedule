import type { Session } from "@ps/domain/session/Session.ts";
import type { CreateUserService } from "@ps/domain/schedule/user/create/CreateUserService.ts";

export class CreateUserServiceMock implements CreateUserService {
    constructor(private readonly session: Session) {}

    public create(): Promise<Session> {
        return Promise.resolve(this.session);
    }
}
