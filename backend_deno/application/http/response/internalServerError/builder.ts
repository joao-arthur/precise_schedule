import type { HTTPResponse } from "../../response/model.ts";

export function internalServerError(): HTTPResponse {
    return {
        status: 500,
        body: { message: "An unexpected error occurred!" },
        headers: undefined,
    };
}
