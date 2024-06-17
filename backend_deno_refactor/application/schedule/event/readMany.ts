import type { User } from "../../../domain/schedule/user/model.ts";
import type { EventRepo } from "../../../domain/schedule/event/repo.ts";
import type { HTTPResponse } from "../../http/response.ts";
import { ok } from "../../http/response.ts";
import { eventInfoReadMany } from "../../../domain/schedule/event/read.ts";

export async function findAllEventControllerImpl(
    repo: EventRepo,
    userId: User["id"],
): Promise<HTTPResponse> {
    const result = await eventInfoReadMany(repo, userId);
    return ok(result);
}
