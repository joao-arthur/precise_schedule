import type { Session } from "../../../session/model.ts";
import type { UserCreateService } from "./service.ts";

export class UserCreateServiceStub implements UserCreateService {
    constructor(private readonly session: Session) {}

    public create(): Promise<Session> {
        return Promise.resolve(this.session);
    }
}
