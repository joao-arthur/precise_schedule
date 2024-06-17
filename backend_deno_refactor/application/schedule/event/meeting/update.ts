import type { User } from "@ps/domain/schedule/user/model.ts";
import type { MeetingUpdateModel } from "@ps/domain/schedule/event/meeting/update/model.ts";
import type { MeetingUpdateService } from "@ps/domain/schedule/event/meeting/update/service.ts";
import type { HTTPRequest } from "../../../../http/request/model.ts";
import type { HTTPResponse } from "../../../../http/response/model.ts";
import type { IdParam } from "../../../../http/IdParam.ts";
import type { MeetingUpdateController } from "./controller.ts";
import { noContent } from "../../../../http/response/noContent/builder.ts";

export class MeetingUpdateControllerImpl implements MeetingUpdateController {
    constructor(private readonly meetingUpdateService: MeetingUpdateService) { }

    public async handle(
        userId: User["id"],
        req: HTTPRequest<MeetingUpdateModel, IdParam>,
    ): Promise<HTTPResponse> {
        await this.meetingUpdateService.update(userId, req.params.id, req.body);
        return noContent();
    }
}
