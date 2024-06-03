import type { Result } from "../lang/result.ts";
import type { Session } from "../session/model.ts";
import type { InvalidSessionError } from "../session/invalid/error.ts";

export type ValidateUserSessionService = {
    readonly validate: (session: Session) => Promise<Result<void, InvalidSessionError>>;
};
