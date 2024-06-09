import type { HTTPRequest } from "../../../http/request/model.ts";
import type { HTTPHeaders } from "../../../http/headers/model.ts";

export type SessionMiddleware = {
    readonly handle: (req: HTTPRequest<undefined, undefined, HTTPHeaders>) => Promise<void>;
};
