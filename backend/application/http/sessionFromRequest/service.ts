import type { Session } from "@ps/domain/session/Session.ts";
import type { Headers } from "@ps/application/http/Headers.ts";
import type { HTTPRequest } from "../HTTPRequest.ts";

export type SessionFromRequestService = {
    readonly create: (req: HTTPRequest<undefined, undefined, Headers>) => Partial<Session>;
};
