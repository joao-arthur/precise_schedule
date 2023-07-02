import { HTTPResponse } from "../HTTPResponse.ts";

export function badRequest<Error>(error: Error): HTTPResponse<Error> {
    return {
        status: 400,
        body: error,
    };
}
