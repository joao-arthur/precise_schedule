import type { Result } from "../../../domain/lang/result.ts";
import type { User } from "../../../../domain/schedule/user/model.ts";
import type { Session } from "../../../domain/session/model.ts";
import type { DecodeSessionService } from "../../../domain/session/decode/service.ts";
import { verify } from "djwt/mod.ts";
import { err, ok } from "../../../domain/lang/result.ts";
import { InvalidSessionError } from "../../../domain/session/invalid/error.ts";
import { SessionPayload } from "../SessionPayload.ts";
import { key } from "../key.ts";

export class DecodeSessionServiceJWTAdapter implements DecodeSessionService {
    export async function decode(
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
