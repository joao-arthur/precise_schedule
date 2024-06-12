import type { Result } from "@ps/domain/lang/result.ts";
import type { User } from "@ps/domain/schedule/user/model.ts";
import type { Session } from "@ps/domain/session/model.ts";
import type { DecodeSessionService } from "@ps/domain/session/decode/service.ts";
import { verify } from "djwt/mod.ts";
import { err, ok } from "@ps/domain/lang/result.ts";
import { InvalidSessionError } from "@ps/domain/session/invalid/error.ts";
import { SessionPayload } from "../SessionPayload.ts";
import { key } from "../key.ts";

export class DecodeSessionServiceJWTAdapter implements DecodeSessionService {
    public async decode(
        session: Session,
    ): Promise<Result<User["id"], InvalidSessionError>> {
        try {
            const payload = await verify(session.token, key);
            const userId = (payload as SessionPayload).userId;
            return ok(userId);
        } catch {
            return err(new InvalidSessionError());
        }
    }
}
