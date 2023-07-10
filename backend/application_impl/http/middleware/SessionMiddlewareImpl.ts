import type { Session } from "@ps/domain/session/Session.ts";
import type { ValidateUserSessionService } from "@ps/domain/userSession/ValidateUserSessionService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { Headers } from "@ps/application/http/Headers.ts";
import type { SessionMiddleware } from "@ps/application/http/middleware/SessionMiddleware.ts";
import type { SessionFromRequestService } from "@ps/application/http/session/SessionFromRequestService.ts";

import { InvalidSessionError } from "@ps/domain/session/InvalidSessionError.ts";

export class SessionMiddlewareImpl implements SessionMiddleware {
    constructor(
        private readonly sessionFromRequestService: SessionFromRequestService,
        private readonly validateUserSessionService: ValidateUserSessionService,
    ) {}

    public async handle(req: HTTPRequest<undefined, undefined, Headers>): Promise<void> {
        const session = this.sessionFromRequestService.create(req);
        if (!session.token) {
            throw new InvalidSessionError();
        }
        await this.validateUserSessionService.validate(session as Session);
    }
}
