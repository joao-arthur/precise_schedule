import type { Result } from "../lang/result.ts";
import type { Session } from "../session/model.ts";
import type { UserRepo } from "../schedule/user/repo.ts";
import type { DecodeSessionService } from "../session/decode.ts";
import { err, ok } from "../lang/result.ts";
import { userReadById } from "../schedule/user/read.ts";
import { InvalidSessionError } from "../session/decode.ts";

type UserSessionErrors = InvalidSessionError;

export async function validateSession(
    repo: UserRepo,
    decodeSessionService: DecodeSessionService,
    session: Session,
): Promise<Result<void, UserSessionErrors>> {
    const userIdResult = await decodeSessionService.decode(session);
    if (userIdResult.type === "err") {
        return userIdResult;
    }
    const userResult = await userReadById(repo, userIdResult.data);
    if (userResult.type === "err") {
        return err(new InvalidSessionError());
    }
    return ok(undefined);
}
