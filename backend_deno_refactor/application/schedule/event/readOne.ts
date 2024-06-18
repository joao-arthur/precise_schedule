import type { User } from "../../../domain/schedule/user/model.ts";
import type { EventRepo } from "../../../domain/schedule/event/repo.ts";
import type { HTTPRequest } from "../../http/request.ts";
import type { HTTPResponse } from "../../http/response.ts";
import { ok } from "../../http/response.ts";
import { eventInfoReadOneService } from "../../../domain/schedule/event/read.ts";
import { errorHandler } from "../../http/errorHandler.ts";

export async function eventInfoReadOneController(
    repo: EventRepo,
    userId: User["id"],
    req: HTTPRequest,
): Promise<HTTPResponse> {
    const result = await eventInfoReadOneService(repo, userId, req.params.id!);
    switch (result.type) {
        case "ok":
            return ok(result.data);
        case "err":
            return errorHandler(result.error);
    }
}
