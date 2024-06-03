import type { Result } from "@ps/domain/lang/result.ts";
import type { InvalidSessionError } from "@ps/domain/session/invalid/error.ts";
import type { HTTPRequest } from "../../../http/request/model.ts";
import type { HTTPHeaders } from "../../../http/headers/model.ts";

export type SessionMiddleware = {
    readonly handle: (
        req: HTTPRequest<undefined, undefined, HTTPHeaders>,
    ) => Promise<Result<void, InvalidSessionError>>;
};
