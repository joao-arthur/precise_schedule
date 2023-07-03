import type { Session } from "@ps/domain/session/Session.ts";
import type { ValidationResult } from "@ps/domain/validation/ValidationResult.ts";
import type { LoginModel } from "@ps/domain/schedule/user/login/LoginModel.ts";
import type { ErrorResponse } from "../../../http/ErrorResponse.ts";
import type { HTTPRequest } from "../../../http/HTTPRequest.ts";
import type { HTTPResponse } from "../../../http/HTTPResponse.ts";

export type LoginController = {
    readonly handle: (
        request: HTTPRequest<LoginModel, never>,
    ) => Promise<
        HTTPResponse<Session | ValidationResult | ErrorResponse>
    >;
};
