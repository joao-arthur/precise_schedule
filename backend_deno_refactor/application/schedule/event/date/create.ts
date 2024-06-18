import type { IdGenerator } from "../../../../domain/generator/id.ts";
import type { DateGenerator } from "../../../../domain/generator/date.ts";
import type { User } from "../../../../domain/schedule/user/model.ts";
import type { EventRepo } from "../../../../domain/schedule/event/repo.ts";
import type { DateCreate } from "../../../../domain/schedule/event/date/create.ts";
import type { HTTPRequest } from "../../../http/request.ts";
import type { HTTPResponse } from "../../../http/response.ts";
import { dateCreateService } from "../../../../domain/schedule/event/date/create.ts";
import { errorHandler } from "../../../http/errorHandler.ts";
import { created } from "../../../http/response.ts";

export async function dateCreateController(
    repo: EventRepo,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<DateCreate>,
): Promise<HTTPResponse> {
    const result = await dateCreateService(
        repo,
        idGenerator,
        dateGenerator,
        userId,
        req.body,
    );
    switch (result.type) {
        case "ok":
            return created(result.data);
        case "err":
            return errorHandler(result.error);
    }
}
