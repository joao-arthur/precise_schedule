import type { DateGenerator } from "../../../../domain/generator/date.ts";
import type { User } from "../../../../domain/schedule/user/model.ts";
import type { EventRepo } from "../../../../domain/schedule/event/repo.ts";
import type { PartyUpdate } from "../../../../domain/schedule/event/party/update.ts";
import type { HTTPRequest, IdParam } from "../../../http/request.ts";
import type { HTTPResponse } from "../../../http/response.ts";
import { partyUpdateService } from "../../../../domain/schedule/event/party/update.ts";
import { noContent } from "../../../http/response.ts";

export async function partyUpdateController(
    repo: EventRepo,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<PartyUpdate, IdParam>,
): Promise<HTTPResponse> {
    const result = await partyUpdateService(
        repo,
        dateGenerator,
        userId,
        req.params.id,
        req.body,
    );
    return noContent();
}
