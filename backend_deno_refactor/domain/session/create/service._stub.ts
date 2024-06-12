import type { Result } from "../../lang/result.ts";
import type { Session } from "../model.ts";
import type { SessionCreateErrors, SessionCreateService } from "./service.ts";
import { ok } from "../../lang/result.ts";

export class SessionCreateServiceStub implements SessionCreateService {
    constructor(private readonly session: Session) {}

    public create(): Promise<Result<Session, SessionCreateErrors>> {
        return Promise.resolve(ok(this.session));
    }
}
