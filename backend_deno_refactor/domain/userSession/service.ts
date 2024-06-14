import type { Result } from "../lang/result.ts";
import type { Session } from "../session/model.ts";
import type { DecodeSessionService } from "../session/decode/service.ts";
import { err, ok } from "../lang/result.ts";
import { InvalidSessionError } from "../session/invalid/error.ts";

type UserSessionErrors = InvalidSessionError;

export async function validate(
    decodeSessionService: DecodeSessionService,
    session: Session,
): Promise<Result<void, UserSessionErrors>> {
    const userIdResult = await decodeSessionService.decode(session);
    if (userIdResult.type === "err") {
        return err(new InvalidSessionError());
    }
    const userResult = await userFindService.findById(userIdResult.data);
    if (userResult.type === "err") {
        return err(new InvalidSessionError());
    }
    return ok(undefined);
}
