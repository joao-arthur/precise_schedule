import type { ValidationResult } from "@ps/domain/validation/ValidationResult.ts";
import type { User } from "@ps/domain/schedule/user/User.ts";
import type { ErrorResponse } from "../../../http/ErrorResponse.ts";
import type { HTTPRequest } from "../../../http/HTTPRequest.ts";
import type { HTTPResponse } from "../../../http/HTTPResponse.ts";
import type { IdParam } from "../../../http/IdParam.ts";

export type FindUserController = {
    readonly handle: (
        request: HTTPRequest<never, IdParam<User["id"]>>,
    ) => Promise<
        HTTPResponse<User | ValidationResult | ErrorResponse>
    >;
};
