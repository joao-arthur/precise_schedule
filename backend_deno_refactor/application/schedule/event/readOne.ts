import type { User } from "../../../domain/schedule/user/model.ts";
import type { EventRepo } from "../../../domain/schedule/event/repo.ts";
import type { HTTPRequest, IdParam } from "../../http/request.ts";
import type { HTTPResponse } from "../../http/response.ts";
import { badRequest, ok } from "../../http/response.ts";
import { eventInfoReadOne } from "../../../domain/schedule/event/read.ts";

export async function eventInfoReadOneController(
    repo: EventRepo,
    userId: User["id"],
    req: HTTPRequest<undefined, IdParam>,
): Promise<HTTPResponse> {
    const result = await eventInfoReadOne(repo, userId, req.params.id);
    switch (result.type) {
        case "ok":
            return ok(result.data);
        case "err":
            return badRequest({ message: result.error.message });
    }
}
