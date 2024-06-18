import type { UserLogin } from "../../../domain/schedule/user/login.ts";
import type { UserRepo } from "../../../domain/schedule/user/repo.ts";
import type { SessionCreateService } from "../../../domain/session/create.ts";
import type { HTTPRequest } from "../../http/request.ts";
import type { HTTPResponse } from "../../http/response.ts";
import { userLoginService } from "../../../domain/schedule/user/login.ts";
import { ok } from "../../http/response.ts";
import { errorHandler } from "../../http/errorHandler.ts";

export async function userLoginController(
    repo: UserRepo,
    sessionCreate: SessionCreateService,
    req: HTTPRequest<UserLogin>,
): Promise<HTTPResponse> {
    const result = await userLoginService(repo, sessionCreate, req.body);
    switch (result.type) {
        case "ok":
            return ok(result.data);
        case "err":
            return errorHandler(result.error);
    }
}
