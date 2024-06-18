import type { IdGenerator } from "../../../domain/generator/id.ts";
import type { DateGenerator } from "../../../domain/generator/date.ts";
import type { User } from "../../../domain/schedule/user/model.ts";
import type { EventRepo } from "../../../domain/schedule/event/repo.ts";
import type { BirthdayCreate } from "../../../domain/schedule/event/birthday/create.ts";
import type { BirthdayUpdate } from "../../../domain/schedule/event/birthday/update.ts";
import type { HTTPRequest } from "../../http/request.ts";
import type { HTTPResponse } from "../../http/response.ts";
import { birthdayCreateService } from "../../../domain/schedule/event/birthday/create.ts";
import { birthdayUpdateService } from "../../../domain/schedule/event/birthday/update.ts";
import { errorHandler } from "../../http/errorHandler.ts";
import { created, noContent } from "../../http/response.ts";

export async function birthdayCreateController(
    repo: EventRepo,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<BirthdayCreate>,
): Promise<HTTPResponse> {
    const result = await birthdayCreateService(repo, idGenerator, dateGenerator, userId, req.body);
    switch (result.type) {
        case "ok":
            return created(result.data);
        case "err":
            return errorHandler(result.error);
    }
}

export async function birthdayUpdateController(
    repo: EventRepo,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<BirthdayUpdate>,
): Promise<HTTPResponse> {
    const result = await birthdayUpdateService(
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
