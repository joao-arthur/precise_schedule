import { HTTPResponse } from "../HTTPResponse.ts";

export function badRequest(
    error: Record<string, unknown>,
): HTTPResponse {
    return {
        status: 400,
        body: error,
    };
}
