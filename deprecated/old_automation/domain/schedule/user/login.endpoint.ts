import type { Res } from "../../../infra/res.ts";
import type { BusinessError } from "../../general/business.error.ts";
import type { Session } from "../../session/session.ts";
import type { LoginModel } from "./login.model.ts";

import { request } from "../../../infra/request.ts";
import { ValidationError } from "../../general/validation.error.ts";

export function loginEndpoint(
    model: LoginModel | undefined | null,
): Promise<Res<Session | BusinessError | ValidationError>> {
    return request.post("user/login", model);
}
