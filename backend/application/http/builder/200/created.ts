import { HTTPResponse } from "../../HTTPResponse.ts";

export function created(): HTTPResponse {
    return {
        status: 201,
        body: undefined,
    };
}
