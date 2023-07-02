import type { ValidationResult } from "@ps/domain/validation/ValidationResult.ts";
import type { User } from "@ps/domain/schedule/user/User.ts";
import type { CreateUserModel } from "@ps/domain/schedule/user/create/CreateUserModel.ts";
import type { ErrorResponse } from "../../../http/ErrorResponse.ts";
import type { HTTPRequest } from "../../../http/HTTPRequest.ts";
import type { HTTPResponse } from "../../../http/HTTPResponse.ts";

export type CreateUserController = {
    readonly handle: (
        request: HTTPRequest<CreateUserModel, never>,
    ) => Promise<
        HTTPResponse<User | ValidationResult | ErrorResponse>
    >;
};
