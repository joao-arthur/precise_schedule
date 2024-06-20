import type { HTTPResponse } from "./response.ts";
import { ValidationError } from "../../domain/validation/validate.ts";
import { SessionDecodeError } from "../../domain/session/service.ts";
import { BusinessError } from "../../domain/general.ts";
import { badRequest, internalServerError, unauthorized } from "./response.ts";

export function errorHandler(error: Error): HTTPResponse {
    if (error instanceof ValidationError) {
        return badRequest({ validation: error.result });
    }
    if (error instanceof BusinessError) {
        return badRequest({ message: error.message });
    }
    if (error instanceof SessionDecodeError) {
        return unauthorized();
    }
    return internalServerError();
}
