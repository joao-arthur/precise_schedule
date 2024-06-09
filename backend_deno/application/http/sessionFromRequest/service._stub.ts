import type { Session } from "@ps/domain/session/model.ts";
import type { SessionFromRequestService } from "./service.ts";

export class SessionFromRequestServiceStub implements SessionFromRequestService {
    constructor(private readonly maybeSession: Partial<Session>) {}

    public create(): Partial<Session> {
        return this.maybeSession;
    }
}
