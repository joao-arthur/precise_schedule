import type { DateGenerator } from "../../../../domain/generator/date.ts";
import type { User } from "../../../../domain/schedule/user/model.ts";
import type { EventRepo } from "../../../../domain/schedule/event/repo.ts";
import type { BirthdayUpdate } from "../../../../domain/schedule/event/birthday/update.ts";
import type { HTTPRequest, IdParam } from "../../../http/request.ts";
import type { HTTPResponse } from "../../../http/response.ts";
import { birthdayUpdateService } from "../../../../domain/schedule/event/birthday/update.ts";
import { noContent } from "../../../http/response.ts";

export async function birthdayUpdateController(
    repo: EventRepo,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<BirthdayUpdate, IdParam>,
): Promise<HTTPResponse> {
    const result = await birthdayUpdateService(
        repo,
        dateGenerator,
        userId,
        req.params.id,
        req.body,
    );
    return noContent();
}
