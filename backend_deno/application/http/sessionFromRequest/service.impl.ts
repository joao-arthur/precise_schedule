import type { Session } from "@ps/domain/session/model.ts";
import type { HTTPHeaders } from "../headers/model.ts";
import type { HTTPRequest } from "../request/model.ts";
import type { SessionFromRequestService } from "./service.ts";

export class SessionFromRequestServiceImpl implements SessionFromRequestService {
    public create(req: HTTPRequest<undefined, undefined, HTTPHeaders>): Partial<Session> {
        return {
            token: req.headers.authorization?.replace("Bearer ", ""),
        };
    }
}
