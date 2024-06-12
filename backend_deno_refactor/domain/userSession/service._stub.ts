import type { Result } from "../lang/result.ts";
import type { UserSessionErrors, ValidateUserSessionService } from "./service.ts";
import { ok } from "../lang/result.ts";

export class ValidateUserSessionServiceStub implements ValidateUserSessionService {
    public validate(): Promise<Result<void, UserSessionErrors>> {
        return Promise.resolve(ok(undefined));
    }
}
