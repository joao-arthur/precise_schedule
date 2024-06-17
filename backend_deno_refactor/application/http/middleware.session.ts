import type { Result } from "../../domain/lang/result.ts";
import type { Session } from "../../domain/session/model.ts";
import type { DecodeSessionService } from "../../domain/session/decode.ts";
import type { UserRepo } from "../../domain/schedule/user/repo.ts";
import type { HTTPHeaders, HTTPRequest } from "./request.ts";
import { err, ok } from "../../domain/lang/result.ts";
import { validateSession } from "../../domain/userSession/service.ts";
import { InvalidSessionError } from "../../domain/session/decode.ts";
import { sessionFromRequest } from "./sessionFromRequest.ts";

export async function sessionMiddleware(
    repo: UserRepo,
    decodeSessionService: DecodeSessionService,
    req: HTTPRequest<undefined, undefined, HTTPHeaders>,
): Promise<Result<void, InvalidSessionError>> {
    const session = sessionFromRequest(req);
    if (!session.token) {
        return err(new InvalidSessionError());
    }
    const result = await validateSession(repo, decodeSessionService, session as Session);
    if (result.type === "err") {
        return result;
    }
    return ok(undefined);
}
