import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { InvalidSessionError } from "@ps/domain/session/InvalidSessionError.ts";
import { BusinessError } from "@ps/domain/general/BusinessError.ts";

import { badRequest } from "@ps/application/http/builder/400/badRequest.ts";
import { unauthorized } from "@ps/application/http/builder/400/unauthorized.ts";
import { internalServerError } from "@ps/application/http/builder/500/internalServerError.ts";

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
