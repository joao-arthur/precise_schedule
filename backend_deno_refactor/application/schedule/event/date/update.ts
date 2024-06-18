import type { DateGenerator } from "../../../../domain/generator/date.ts";
import type { User } from "../../../../domain/schedule/user/model.ts";
import type { EventRepo } from "../../../../domain/schedule/event/repo.ts";
import type { DateUpdate } from "../../../../domain/schedule/event/date/update.ts";
import type { HTTPRequest } from "../../../http/request.ts";
import type { HTTPResponse } from "../../../http/response.ts";
import { dateUpdateService } from "../../../../domain/schedule/event/date/update.ts";
import { errorHandler } from "../../../http/errorHandler.ts";
import { noContent } from "../../../http/response.ts";

export async function dateUpdateController(
    repo: EventRepo,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<DateUpdate>,
): Promise<HTTPResponse> {
    const result = await dateUpdateService(
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
