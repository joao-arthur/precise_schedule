import type { Session } from "@ps/domain/session/model.ts";
import type { ValidateUserSessionService } from "@ps/domain/userSession/service.ts";
import type { HTTPRequest } from "../../request/model.ts";
import type { HTTPHeaders } from "../../headers/model.ts";
import type { SessionFromRequestService } from "../../sessionFromRequest/service.ts";
import type { SessionMiddleware } from "./middleware.ts";
import { InvalidSessionError } from "@ps/domain/session/invalid/error.ts";

export class SessionMiddlewareImpl implements SessionMiddleware {
    constructor(
        private readonly sessionFromRequestService: SessionFromRequestService,
        private readonly validateUserSessionService: ValidateUserSessionService,
    ) {}

    public async handle(req: HTTPRequest<undefined, undefined, HTTPHeaders>): Promise<void> {
        const session = this.sessionFromRequestService.create(req);
        if (!session.token) {
            throw new InvalidSessionError();
        }
        await this.validateUserSessionService.validate(session as Session);
    }
}
