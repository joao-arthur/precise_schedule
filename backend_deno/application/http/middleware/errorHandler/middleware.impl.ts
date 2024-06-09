import type { HTTPResponse } from "../../response/model.ts";
import type { ErrorHandlerMiddleware } from "./middleware.ts";
import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { BusinessError } from "@ps/domain/general/business/error.ts";
import { InvalidSessionError } from "@ps/domain/session/invalid/error.ts";
import { badRequest } from "../../response/badRequest/builder.ts";
import { unauthorized } from "../../response/unauthorized/builder.ts";
import { internalServerError } from "../../response/internalServerError/builder.ts";

export class ErrorHandlerMiddlewareImpl implements ErrorHandlerMiddleware {
    public handle(error: unknown): HTTPResponse {
        if (error instanceof ValidationError) {
            return badRequest({ validation: error.result });
        }
        if (error instanceof BusinessError) {
            return badRequest({ message: error.message });
        }
        if (error instanceof InvalidSessionError) {
            return unauthorized();
        }
        return internalServerError();
    }
}
