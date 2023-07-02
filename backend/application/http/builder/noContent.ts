import { HTTPResponse } from "../HTTPResponse.ts";

export function noContent(): HTTPResponse<undefined> {
    return {
        status: 204,
        body: undefined,
    };
}
