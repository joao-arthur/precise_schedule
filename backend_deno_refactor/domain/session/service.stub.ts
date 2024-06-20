import type { User } from "../schedule/user/model.ts";
import type { Session, SessionService } from "./service.ts";
import { ok } from "../lang/result.ts";

export const session: Session = {
    token: "token",
};

export function sessionStubBuild(session: Session, userId: User["id"]): SessionService {
    return {
        create: () => Promise.resolve(ok(session)),
        decode: () => Promise.resolve(ok(userId)),
    };
}
