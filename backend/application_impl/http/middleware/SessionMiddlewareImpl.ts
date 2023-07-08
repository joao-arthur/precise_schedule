import type { Session } from "@ps/domain/session/Session.ts";
import type { ValidateUserSessionService } from "@ps/domain/userSession/ValidateUserSessionService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { Headers } from "@ps/application/http/Headers.ts";

import { InvalidSessionError } from "@ps/domain/session/InvalidSessionError.ts";

export class SessionMiddlewareImpl {
    constructor(
        private readonly validateUserSessionService:
            ValidateUserSessionService,
    ) {}

    public async handle(
        request: HTTPRequest<
            undefined,
            undefined,
            Headers
        >,
    ): Promise<void> {
        const authorization = request.headers.Authorization;
        if (!authorization) {
            throw new InvalidSessionError();
        }
        const token = authorization.replace("Bearer ", "");
        const session: Session = { token };
        await this.validateUserSessionService.validate(session);
    }
}
