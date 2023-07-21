import type { Session } from "@ps/domain/session/Session.ts";
import type { Headers } from "@ps/application/http/Headers.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { SessionFromRequestService } from "@ps/application/http/session/SessionFromRequestService.ts";

export class SessionFromRequestServiceImpl implements SessionFromRequestService {
    public create(req: HTTPRequest<undefined, undefined, Headers>): Partial<Session> {
        return {
            token: req.headers.authorization?.replace("Bearer ", ""),
        };
    }
}
