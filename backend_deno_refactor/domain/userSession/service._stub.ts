import type { Result } from "../lang/result.ts";
import type { InvalidSessionError } from "../session/invalid/error.ts";
import { buildOk } from "../lang/result.ts";
import { ValidateUserSessionService } from "./service.ts";

export class ValidateUserSessionServiceStub implements ValidateUserSessionService {
    public validate(): Promise<Result<void, InvalidSessionError>> {
        return Promise.resolve(buildOk(undefined));
    }
}
