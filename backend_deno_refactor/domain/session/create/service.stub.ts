import type { Session } from "../model.ts";
import type { SessionCreateService } from "./service.ts";
import { ok } from "../../lang/result.ts";

export function sessionCreateStubBuild(session: Session): SessionCreateService {
    return {
        create: () => Promise.resolve(ok(session)),
    };
}
