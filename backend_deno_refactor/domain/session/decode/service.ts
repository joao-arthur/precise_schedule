import type { Result } from "../../lang/result.ts";
import type { User } from "../../schedule/user/model.ts";
import type { Session } from "../model.ts";
import type { InvalidSessionError } from "../../session/invalid/error.ts";

export type DecodeSessionErrors = InvalidSessionError;

export type DecodeSessionService = {
    readonly decode: (
        session: Session,
    ) => Promise<Result<User["id"], DecodeSessionErrors>>;
};
