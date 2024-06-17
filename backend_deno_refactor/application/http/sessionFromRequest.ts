import type { Session } from "../../domain/session/model.ts";
import type { HTTPHeaders, HTTPRequest } from "./request.ts";

export function sessionFromRequest(
    req: HTTPRequest<undefined, undefined, HTTPHeaders>,
): Partial<Session> {
    return {
        token: req.headers.authorization?.replace("Bearer ", ""),
    };
}
