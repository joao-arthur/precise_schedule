import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

export function badRequest(body: Record<string, unknown>): HTTPResponse {
    return {
        status: 400,
        body,
        headers: undefined,
    };
}
