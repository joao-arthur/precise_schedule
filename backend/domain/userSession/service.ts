import type { Session } from "../session/Session.ts";

export type ValidateUserSessionService = {
    readonly validate: (session: Session) => Promise<void>;
};
