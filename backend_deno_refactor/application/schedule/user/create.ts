import type { IdGenerator } from "../../../domain/generator/id.ts";
import type { DateGenerator } from "../../../domain/generator/date.ts";
import type { SessionCreateService } from "../../../domain/session/create.ts";
import type { UserCreate } from "../../../domain/schedule/user/create.ts";
import type { UserRepo } from "../../../domain/schedule/user/repo.ts";
import type { HTTPRequest } from "../../http/request.ts";
import type { HTTPResponse } from "../../http/response.ts";
import { userCreateService } from "../../../domain/schedule/user/create.ts";
import { ok } from "../../http/response.ts";
import { errorHandler } from "../../http/errorHandler.ts";

export async function userCreateController(
    repo: UserRepo,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator,
    sessionCreate: SessionCreateService,
    req: HTTPRequest<UserCreate>,
): Promise<HTTPResponse> {
    const result = await userCreateService(
        repo,
        idGenerator,
        dateGenerator,
        sessionCreate,
        req.body,
    );
    switch (result.type) {
        case "ok":
            return ok(result.data);
        case "err":
            return errorHandler(result.error);
    }
}
