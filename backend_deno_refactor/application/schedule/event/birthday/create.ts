import type { IdGenerator } from "../../../../domain/generator/id.ts";
import type { DateGenerator } from "../../../../domain/generator/date.ts";
import type { User } from "../../../../domain/schedule/user/model.ts";
import type { EventRepo } from "../../../../domain/schedule/event/repo.ts";
import type { BirthdayCreate } from "../../../../domain/schedule/event/birthday/create.ts";
import type { HTTPRequest } from "../../../http/request.ts";
import type { HTTPResponse } from "../../../http/response.ts";
import { birthdayCreateService } from "../../../../domain/schedule/event/birthday/create.ts";
import { created } from "../../../http/response.ts";

export async function birthdayCreateController(
    repo: EventRepo,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<BirthdayCreate>,
): Promise<HTTPResponse> {
    const result = await birthdayCreateService(
        repo,
        idGenerator,
        dateGenerator,
        userId,
        req.body,
    );
    return created(result);
}
