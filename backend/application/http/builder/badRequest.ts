import { HTTPResponse } from "../HTTPResponse.ts";

export function badRequest<Error>(error: Error): HTTPResponse<Error> {
    return {
        body: error,
        status: 400,
    };
}
