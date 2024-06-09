import type { Session } from "../session/model.ts";

export type ValidateUserSessionService = {
    readonly validate: (session: Session) => Promise<void>;
};
