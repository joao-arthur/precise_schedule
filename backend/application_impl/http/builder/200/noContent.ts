import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

export function noContent(): HTTPResponse {
    return {
        status: 204,
        body: undefined,
    };
}
