import type { User } from "../../../domain/schedule/user/model.ts";
import type { EventRepo } from "../../../domain/schedule/event/repo.ts";
import type { HTTPRequest } from "../../http/request.ts";
import type { HTTPResponse } from "../../http/response.ts";
import { eventDelete } from "../../../domain/schedule/event/delete.ts";
import { noContent } from "../../http/response.ts";

export async function eventDeleteController(
    repo: EventRepo,
    userId: User["id"],
    req: HTTPRequest,
): Promise<HTTPResponse> {
    await eventDelete(repo, userId, req.params.id!);
    return noContent();
}
