import { HTTPResponse } from "../../HTTPResponse.ts";

export function badRequest(
    body: Record<string, unknown>,
): HTTPResponse {
    return {
        status: 400,
        body,
    };
}
