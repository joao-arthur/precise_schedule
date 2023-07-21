import type { Session } from "@ps/domain/session/Session.ts";
import type { CreateSessionService } from "@ps/domain/session/create/CreateSessionService.ts";

export class CreateSessionServiceMock implements CreateSessionService {
    constructor(private readonly session: Session) {}

    public create(): Promise<Session> {
        return Promise.resolve(this.session);
    }
}
