import type { Result } from "../../lang/result.ts";
import type { User } from "../../schedule/user/model.ts";
import type { Session } from "../model.ts";
import type { SessionCreateError } from "./error.ts";

export type SessionCreateErrors = SessionCreateError;

export type SessionCreateService = {
    readonly create: (userId: User["id"]) => Promise<Result<Session, SessionCreateErrors>>;
};
