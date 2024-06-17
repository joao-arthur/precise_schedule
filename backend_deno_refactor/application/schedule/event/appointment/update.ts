import type { DateGenerator } from "../../../../domain/generator/date.ts";
import type { User } from "../../../../domain/schedule/user/model.ts";
import type { EventRepo } from "../../../../domain/schedule/event/repo.ts";
import type { AppointmentUpdate } from "../../../../domain/schedule/event/appointment/update.ts";
import type { HTTPRequest, IdParam } from "../../../http/request.ts";
import type { HTTPResponse } from "../../../http/response.ts";
import { appointmentUpdateService } from "../../../../domain/schedule/event/appointment/update.ts";
import { noContent } from "../../../http/response.ts";

export async function appointmentUpdateController(
    repo: EventRepo,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<AppointmentUpdate, IdParam>,
): Promise<HTTPResponse> {
    const result = await appointmentUpdateService(
        repo,
        dateGenerator,
        userId,
        req.params.id,
        req.body,
    );
    return noContent();
}
