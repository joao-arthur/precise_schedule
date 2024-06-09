import type { User } from "@ps/domain/schedule/user/model.ts";
import type { EventDeleteService } from "@ps/domain/schedule/event/delete/service.ts";
import type { HTTPRequest } from "../../../http/request/model.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";
import type { IdParam } from "../../../http/IdParam.ts";
import type { EventDeleteController } from "./controller.ts";
import { noContent } from "../../../http/response/noContent/builder.ts";

export class EventDeleteControllerImpl implements EventDeleteController {
    constructor(private readonly eventDeleteService: EventDeleteService) {}

    public async handle(
        userId: User["id"],
        req: HTTPRequest<undefined, IdParam>,
    ): Promise<HTTPResponse> {
        await this.eventDeleteService.del(userId, req.params.id);
        return noContent();
    }
}
