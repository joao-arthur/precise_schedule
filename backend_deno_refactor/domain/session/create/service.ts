import type { Result } from "../../lang/result.ts";
import type { User } from "../../schedule/user/model.ts";
import type { Session } from "../model.ts";

export class SessionCreateError extends Error {
    constructor() {
        super("It was not possible to create your session!");
    }
}

export type SessionCreateErrors = SessionCreateError;

export type SessionCreateService = {
    readonly create: (userId: User["id"]) => Promise<Result<Session, SessionCreateErrors>>;
};
