import type { Session } from "@ps/domain/session/Session.ts";
import type { SessionFromRequestService } from "@ps/application/http/session/SessionFromRequestService.ts";

export class SessionFromRequestServiceMock implements SessionFromRequestService {
    constructor(private readonly maybeSession: Partial<Session>) {}

    public create(): Partial<Session> {
        return this.maybeSession;
    }
}
