import type { Session } from "../../domain/session/model.ts";
import type { HTTPRequest } from "./request.ts";

export function sessionFromRequest(req: HTTPRequest): Partial<Session> {
    return {
        token: req.headers.authorization?.replace("Bearer ", ""),
    };
}
