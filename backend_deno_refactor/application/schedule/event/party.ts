import type { IdGenerator } from "../../../domain/generator/id.ts";
import type { DateGenerator } from "../../../domain/generator/date.ts";
import type { User } from "../../../domain/schedule/user/model.ts";
import type { EventRepo } from "../../../domain/schedule/event/repo.ts";
import type { PartyCreate } from "../../../domain/schedule/event/party/create.ts";
import type { PartyUpdate } from "../../../domain/schedule/event/party/update.ts";
import type { HTTPRequest } from "../../http/request.ts";
import type { HTTPResponse } from "../../http/response.ts";
import { partyCreateService } from "../../../domain/schedule/event/party/create.ts";
import { partyUpdateService } from "../../../domain/schedule/event/party/update.ts";
import { errorHandler } from "../../http/errorHandler.ts";
import { created, noContent } from "../../http/response.ts";

export async function partyCreateController(
    repo: EventRepo,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<PartyCreate>,
): Promise<HTTPResponse> {
    const result = await partyCreateService(repo, idGenerator, dateGenerator, userId, req.body);
    switch (result.type) {
        case "ok":
            return created(result.data);
        case "err":
            return errorHandler(result.error);
    }
}

export async function partyUpdateController(
    repo: EventRepo,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<PartyUpdate>,
): Promise<HTTPResponse> {
    const result = await partyUpdateService(repo, dateGenerator, userId, req.params.id!, req.body);
    switch (result.type) {
        case "ok":
            return noContent();
        case "err":
            return errorHandler(result.error);
    }
}
