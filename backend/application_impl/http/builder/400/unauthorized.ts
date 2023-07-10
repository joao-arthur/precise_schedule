import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

export function unauthorized(): HTTPResponse {
    return {
        status: 401,
        body: undefined,
    };
}
