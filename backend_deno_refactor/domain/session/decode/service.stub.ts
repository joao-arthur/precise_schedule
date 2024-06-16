import type { Result } from "../../lang/result.ts";
import type { User } from "../../schedule/user/model.ts";
import type { DecodeSessionErrors, DecodeSessionService } from "./service.ts";
import { ok } from "../../lang/result.ts";

export class DecodeSessionServiceStub implements DecodeSessionService {
    constructor(private readonly userId: User["id"]) {}

    public decode(): Promise<Result<User["id"], DecodeSessionErrors>> {
        return Promise.resolve(ok(this.userId));
    }
}
