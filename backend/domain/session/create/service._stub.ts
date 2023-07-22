import type { Session } from "../model.ts";
import type { SessionCreateService } from "./service.ts";

export class SessionCreateServiceStub implements SessionCreateService {
    constructor(private readonly session: Session) {}

    public create(): Promise<Session> {
        return Promise.resolve(this.session);
    }
}
