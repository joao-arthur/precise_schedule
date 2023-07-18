import type { ErrorHandlerMiddleware } from "@ps/application/http/middleware/ErrorHandlerMiddleware.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { BusinessError } from "@ps/domain/general/BusinessError.ts";
import { InvalidSessionError } from "@ps/domain/session/InvalidSessionError.ts";

import { badRequest } from "@ps/application_impl/http/builder/400/badRequest.ts";
import { unauthorized } from "@ps/application_impl/http/builder/400/unauthorized.ts";
import { internalServerError } from "@ps/application_impl/http/builder/500/internalServerError.ts";

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
