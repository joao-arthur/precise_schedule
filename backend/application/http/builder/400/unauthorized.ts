import { HTTPResponse } from "../../HTTPResponse.ts";

export function unauthorized(): HTTPResponse {
    return {
        status: 401,
        body: undefined,
    };
}
