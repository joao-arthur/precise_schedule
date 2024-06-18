import type { DateGenerator } from "../../../domain/generator/date.ts";
import type { User } from "../../../domain/schedule/user/model.ts";
import type { UserRepo } from "../../../domain/schedule/user/repo.ts";
import type { UserUpdate } from "../../../domain/schedule/user/update.ts";
import type { HTTPRequest } from "../../http/request.ts";
import type { HTTPResponse } from "../../http/response.ts";
import { userUpdateService } from "../../../domain/schedule/user/update.ts";
import { errorHandler } from "../../http/errorHandler.ts";
import { noContent } from "../../http/response.ts";

export async function userUpdateController(
    repo: UserRepo,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<UserUpdate>,
): Promise<HTTPResponse> {
    const result = await userUpdateService(repo, dateGenerator, userId, req.body);
    switch (result.type) {
        case "ok":
            return noContent();
        case "err":
            return errorHandler(result.error);
    }
}
