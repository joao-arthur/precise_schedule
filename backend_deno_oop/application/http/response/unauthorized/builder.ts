import type { HTTPResponse } from "../../response/model.ts";

export function unauthorized(): HTTPResponse {
    return {
        status: 401,
        body: undefined,
        headers: undefined,
    };
}
