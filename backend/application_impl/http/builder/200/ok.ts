import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

export function ok(data: Record<string, unknown>): HTTPResponse {
    return {
        status: 200,
        body: data,
        headers: undefined,
    };
}
