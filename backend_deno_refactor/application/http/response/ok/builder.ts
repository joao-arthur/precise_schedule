import type { HTTPResponse } from "../../response/model.ts";

export function ok(data: Record<string, unknown> | readonly unknown[]): HTTPResponse {
    return {
        status: 200,
        body: data,
        headers: undefined,
    };
}
