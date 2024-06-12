import type { Result } from "../lang/result.ts";
import type { UserSessionErrors, ValidateUserSessionService } from "./service.ts";
import { buildOk } from "../lang/result.ts";

export class ValidateUserSessionServiceStub implements ValidateUserSessionService {
    public validate(): Promise<Result<void, UserSessionErrors>> {
        return Promise.resolve(buildOk(undefined));
    }
}
