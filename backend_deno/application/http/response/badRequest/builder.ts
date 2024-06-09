import type { HTTPResponse } from "../../response/model.ts";

export function badRequest(body: Record<string, unknown>): HTTPResponse {
    return {
        status: 400,
        body,
        headers: undefined,
    };
}
