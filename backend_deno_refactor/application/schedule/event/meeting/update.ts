import type { DateGenerator } from "../../../../domain/generator/date.ts";
import type { User } from "../../../../domain/schedule/user/model.ts";
import type { EventRepo } from "../../../../domain/schedule/event/repo.ts";
import type { MeetingUpdate } from "../../../../domain/schedule/event/meeting/update.ts";
import type { HTTPRequest } from "../../../http/request.ts";
import type { HTTPResponse } from "../../../http/response.ts";
import { meetingUpdateService } from "../../../../domain/schedule/event/meeting/update.ts";
import { errorHandler } from "../../../http/errorHandler.ts";
import { noContent } from "../../../http/response.ts";

export async function meetingUpdateController(
    repo: EventRepo,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<MeetingUpdate>,
): Promise<HTTPResponse> {
    const result = await meetingUpdateService(
        repo,
        dateGenerator,
        userId,
        req.params.id!,
        req.body,
    );
    switch (result.type) {
        case "ok":
            return noContent();
        case "err":
            return errorHandler(result.error);
    }
}
