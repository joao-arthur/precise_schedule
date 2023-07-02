import { ErrorResponse } from "../ErrorResponse.ts";
import { HTTPResponse } from "../HTTPResponse.ts";

export function internalServerError(): HTTPResponse<ErrorResponse> {
    return {
        status: 500,
        body: { message: "An unexpected error occurred!" },
    };
}
