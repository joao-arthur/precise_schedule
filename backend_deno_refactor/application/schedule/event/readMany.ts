import type { User } from "../../../domain/schedule/user/model.ts";
import type { EventRepo } from "../../../domain/schedule/event/repo.ts";
import type { HTTPResponse } from "../../http/response.ts";
import { eventInfoReadManyService } from "../../../domain/schedule/event/read.ts";
import { ok } from "../../http/response.ts";
import { errorHandler } from "../../http/errorHandler.ts";

export async function eventInfoReadManyController(
    repo: EventRepo,
    userId: User["id"],
): Promise<HTTPResponse> {
    const result = await eventInfoReadManyService(repo, userId);
    switch (result.type) {
        case "ok":
            return ok(result.data);
        case "err":
            return errorHandler(result.error);
    }
}
