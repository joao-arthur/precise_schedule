import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";

export type FindUserController = {
    readonly handle: (req: HTTPRequest<undefined, IdParam>) => Promise<HTTPResponse>;
};
