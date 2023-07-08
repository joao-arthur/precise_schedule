import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { InvalidSessionError } from "@ps/domain/session/InvalidSessionError.ts";
import { BusinessError } from "@ps/domain/general/BusinessError.ts";

import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";
import { unauthorized } from "@ps/application/http/builder/unauthorized.ts";

type CallBack = () => Promise<HTTPResponse>;

export async function errorHandler(
    cb: CallBack,
): Promise<HTTPResponse> {
    try {
        const result = await cb();
        return result;
    } catch (e: unknown) {
        if (e instanceof ValidationError) {
            return badRequest(e.result);
        }
        if (e instanceof BusinessError) {
            return badRequest({ message: e.message });
        }
        if (e instanceof InvalidSessionError) {
            return unauthorized();
        }
        return internalServerError();
    }
}
