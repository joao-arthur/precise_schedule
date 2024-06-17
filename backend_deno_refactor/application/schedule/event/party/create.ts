import type { IdGenerator } from "../../../../domain/generator/id.ts";
import type { DateGenerator } from "../../../../domain/generator/date.ts";
import type { User } from "../../../../domain/schedule/user/model.ts";
import type { EventRepo } from "../../../../domain/schedule/event/repo.ts";
import type { PartyCreate } from "../../../../domain/schedule/event/party/create.ts";
import type { HTTPRequest } from "../../../http/request.ts";
import type { HTTPResponse } from "../../../http/response.ts";
import { partyCreateService } from "../../../../domain/schedule/event/party/create.ts";
import { created } from "../../../http/response.ts";

export async function partyCreateController(
    repo: EventRepo,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<PartyCreate>,
): Promise<HTTPResponse> {
    const result = await partyCreateService(
        repo,
        idGenerator,
        dateGenerator,
        userId,
        req.body,
    );
    return created(result);
}
