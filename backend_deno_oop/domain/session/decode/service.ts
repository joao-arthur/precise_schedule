import type { User } from "../../schedule/user/model.ts";
import type { Session } from "../model.ts";

export type DecodeSessionService = {
    readonly decode: (session: Session) => Promise<User["id"]>;
};
