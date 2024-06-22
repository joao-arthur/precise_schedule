import type { Result } from "../lang/result.ts";
import type { User } from "../schedule/user/model.ts";

export type Session = {
    readonly token: string;
};

export class SessionCreateErr extends Error {
    constructor() {
        super("It was not possible to create your session!");
    }
}

export class SessionDecodeErr extends Error {
    constructor() {
        super("Your session is not valid!");
    }
}

export type SessionService = {
    readonly create: (userId: User["id"]) => Promise<Result<Session, SessionCreateErr>>;
    readonly decode: (session: Session) => Promise<Result<User["id"], SessionDecodeErr>>;
};
