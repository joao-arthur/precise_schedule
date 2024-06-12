import type { Result } from "../../../lang/result.ts";
import type { Session } from "../../../session/model.ts";
import type { UserCreateErrors, UserCreateService } from "./service.ts";
import { ok } from "../../../lang/result.ts";

export class UserCreateServiceStub implements UserCreateService {
    constructor(private readonly session: Session) {}

    public create(): Promise<Result<Session, UserCreateErrors>> {
        return Promise.resolve(ok(this.session));
    }
}
