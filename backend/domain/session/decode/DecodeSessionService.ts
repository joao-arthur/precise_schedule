import type { User } from "../../schedule/user/User.ts";
import type { Session } from "../Session.ts";

export type DecodeSessionService = {
    readonly decode: (session: Session) => Promise<User["id"]>;
};
