import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

export function created(): HTTPResponse {
    return {
        status: 201,
        body: undefined,
    };
}
