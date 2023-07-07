import { HTTPResponse } from "../HTTPResponse.ts";

export function noContent(): HTTPResponse {
    return {
        status: 204,
        body: undefined,
    };
}
