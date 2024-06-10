import type { Result } from "../../lang/result.ts";
import type { User } from "../../schedule/user/model.ts";
import type { DecodeSessionService } from "./service.ts";
import { InvalidSessionError } from "@ps/domain/session/invalid/error.ts";
import { buildOk } from "../../lang/result.ts";

export class DecodeSessionServiceStub implements DecodeSessionService {
    constructor(private readonly userId: User["id"]) {}

    public decode(): Promise<Result<User["id"], InvalidSessionError>> {
        return Promise.resolve(buildOk(this.userId));
    }
}
