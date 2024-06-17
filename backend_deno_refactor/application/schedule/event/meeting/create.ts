import type { IdGenerator } from "../../../../domain/generator/id.ts";
import type { DateGenerator } from "../../../../domain/generator/date.ts";
import type { User } from "../../../../domain/schedule/user/model.ts";
import type { EventRepo } from "../../../../domain/schedule/event/repo.ts";
import type { MeetingCreate } from "../../../../domain/schedule/event/meeting/create.ts";
import type { HTTPRequest } from "../../../http/request.ts";
import type { HTTPResponse } from "../../../http/response.ts";
import { meetingCreateService } from "../../../../domain/schedule/event/meeting/create.ts";
import { created } from "../../../http/response.ts";

export async function meetingCreateController(
    repo: EventRepo,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<MeetingCreate>,
): Promise<HTTPResponse> {
    const result = await meetingCreateService(
        repo,
        idGenerator,
        dateGenerator,
        userId,
        req.body,
    );
    return created(result);
}
