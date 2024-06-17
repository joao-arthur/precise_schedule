import type { User } from "../schedule/user/model.ts";
import type { DecodeSessionService } from "./decode.ts";
import { ok } from "../lang/result.ts";

export function decodeSessionStubBuild(userId: User["id"]): DecodeSessionService {
    return {
        decode: () => Promise.resolve(ok(userId)),
    };
}
