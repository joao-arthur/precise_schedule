import type { HTTPResponse } from "./response.ts";
import { ValidationErr } from "../../domain/validation/validate.ts";
import { SessionDecodeErr } from "../../domain/session/service.ts";
import { BusinessErr } from "../../domain/general.ts";
import { badRequest, internalServerError, unauthorized } from "./response.ts";

export function errorHandler(error: Error): HTTPResponse {
    if (error instanceof ValidationErr) {
        return badRequest({ validation: error.result });
    }
    if (error instanceof BusinessErr) {
        return badRequest({ message: error.message });
    }
    if (error instanceof SessionDecodeErr) {
        return unauthorized();
    }
    return internalServerError();
}
