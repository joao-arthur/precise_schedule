import type { Result } from "../lang/result.ts";
import type { User } from "../schedule/user/model.ts";
import type { Session } from "./model.ts";

export class InvalidSessionError extends Error {
    constructor() {
        super("Your session is not valid!");
    }
}

export type DecodeSessionErrors = InvalidSessionError;

export type DecodeSessionService = {
    readonly decode: (session: Session) => Promise<Result<User["id"], DecodeSessionErrors>>;
};
