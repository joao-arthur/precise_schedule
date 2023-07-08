import type { User } from "../../schedule/user/User.ts";
import type { Session } from "../Session.ts";

export type CreateSessionService = {
    readonly create: (userId: User["id"]) => Promise<Session>;
};
