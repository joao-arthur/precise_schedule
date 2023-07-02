import { HTTPResponse } from "../HTTPResponse.ts";

export function created(): HTTPResponse<undefined> {
    return {
        status: 201,
        body: undefined,
    };
}
