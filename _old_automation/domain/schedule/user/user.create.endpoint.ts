import type { Res } from "../../../infra/res.ts";
import type { BusinessError } from "../../general/business.error.ts";
import type { Session } from "../../session/session.ts";
import type { CreateUserModel } from "./user.create.model.ts";

import { request } from "../../../infra/request.ts";
import { ValidationError } from "../../general/validation.error.ts";

export function createUserEndpoint(
    model: CreateUserModel | undefined | null,
): Promise<Res<Session | BusinessError | ValidationError>> {
    return request.post("user", model);
}
