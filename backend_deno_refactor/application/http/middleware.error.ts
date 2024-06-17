import type { HTTPResponse } from "./response.ts";
import { ValidationError } from "../../domain/validation/validate.ts";
import { InvalidSessionError } from "../../domain/session/decode.ts";
import { badRequest, internalServerError, unauthorized } from "./response.ts";

export function errorMiddleware(error: unknown): HTTPResponse {
    if (error instanceof ValidationError) {
        return badRequest({ validation: error.result });
    }
    if (error instanceof InvalidSessionError) {
        return unauthorized();
    }
    return internalServerError();
}
