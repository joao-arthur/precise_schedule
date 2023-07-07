import { HTTPResponse } from "../HTTPResponse.ts";

export function internalServerError(): HTTPResponse {
    return {
        status: 500,
        body: { message: "An unexpected error occurred!" },
    };
}
