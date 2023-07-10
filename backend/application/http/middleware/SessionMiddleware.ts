import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { Headers } from "@ps/application/http/Headers.ts";

export type SessionMiddleware = {
    readonly handle: (req: HTTPRequest<undefined, undefined, Headers>) => Promise<void>;
};
