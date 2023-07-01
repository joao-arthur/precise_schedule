import { ErrorResponse } from "../ErrorResponse.ts";
import { HTTPResponse } from "../HTTPResponse.ts";

export function internalServerError(): HTTPResponse<ErrorResponse> {
    return {
        body: { message: "An unexpected error occurred!" },
        status: 500,
    };
}
