import type { Result } from "../../lang/result.ts";
import type { Session } from "../model.ts";
import type { SessionCreateService } from "./service.ts";
import { buildOk } from "../../lang/result.ts";

export class SessionCreateServiceStub implements SessionCreateService {
    constructor(private readonly session: Session) {}

    public create(): Promise<Result<Session>> {
        return Promise.resolve(buildOk(this.session));
    }
}
