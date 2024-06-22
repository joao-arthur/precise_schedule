import type { Result } from "../lang/result.ts";
import type { Session } from "../session/service.ts";
import type { UserRepo } from "../schedule/user/repo.ts";
import type { SessionService } from "../session/service.ts";
import { err, ok } from "../lang/result.ts";
import { userReadById } from "../schedule/user/read.ts";
import { SessionDecodeErr } from "../session/service.ts";

type UserSessionErrors = SessionDecodeErr;

export async function validateSession(
    repo: UserRepo,
    sessionService: SessionService,
    session: Session,
): Promise<Result<void, UserSessionErrors>> {
    const userIdResult = await sessionService.decode(session);
    if (userIdResult.type === "err") {
        return userIdResult;
    }
    const userResult = await userReadById(repo, userIdResult.data);
    if (userResult.type === "err") {
        return err(new SessionDecodeErr());
    }
    return ok(undefined);
}
