import type { Result } from "@ps/domain/lang/result.ts";
import type { Session } from "@ps/domain/session/model.ts";
import type { ValidateUserSessionService } from "@ps/domain/userSession/service.ts";
import type { HTTPRequest } from "../../request/model.ts";
import type { HTTPHeaders } from "../../headers/model.ts";
import type { SessionFromRequestService } from "../../sessionFromRequest/service.ts";
import type { SessionMiddleware } from "./middleware.ts";
import { buildErr, buildOk } from "@ps/domain/lang/result.ts";
import { InvalidSessionError } from "@ps/domain/session/invalid/error.ts";

export class SessionMiddlewareImpl implements SessionMiddleware {
    constructor(
        private readonly sessionFromRequestService: SessionFromRequestService,
        private readonly validateUserSessionService: ValidateUserSessionService,
    ) {}

    public async handle(
        req: HTTPRequest<undefined, undefined, HTTPHeaders>,
    ): Promise<Result<void, InvalidSessionError>> {
        const session = this.sessionFromRequestService.create(req);
        if (!session.token) {
            return buildErr(new InvalidSessionError());
        }
        const result = await this.validateUserSessionService.validate(session as Session);
        if (result.type === "err") {
            return buildErr(new InvalidSessionError());
        }
        return buildOk(undefined);
    }
}
