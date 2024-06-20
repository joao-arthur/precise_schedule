import type { Result } from "../../domain/lang/result.ts";
import type { Session } from "../../domain/session/service.ts";
import type { SessionService } from "../../domain/session/service.ts";
import type { UserRepo } from "../../domain/schedule/user/repo.ts";
import type { HTTPRequest } from "./request.ts";
import { err, ok } from "../../domain/lang/result.ts";
import { validateSession } from "../../domain/userSession/service.ts";
import { SessionDecodeError } from "../../domain/session/service.ts";
import { sessionFromRequest } from "./sessionFromRequest.ts";

export async function sessionMiddleware(
    repo: UserRepo,
    sessionService: SessionService,
    req: HTTPRequest,
): Promise<Result<void, SessionDecodeError>> {
    const session = sessionFromRequest(req);
    if (!session.token) {
        return err(new SessionDecodeError());
    }
    const result = await validateSession(repo, sessionService, session as Session);
    if (result.type === "err") {
        return result;
    }
    return ok(undefined);
}
