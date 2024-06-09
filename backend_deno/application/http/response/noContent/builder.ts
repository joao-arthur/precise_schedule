import type { HTTPResponse } from "../../response/model.ts";

export function noContent(): HTTPResponse {
    return {
        status: 204,
        body: undefined,
        headers: undefined,
    };
}
