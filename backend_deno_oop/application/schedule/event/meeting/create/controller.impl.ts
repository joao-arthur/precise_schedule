import type { User } from "@ps/domain/schedule/user/model.ts";
import type { MeetingCreateModel } from "@ps/domain/schedule/event/meeting/create/model.ts";
import type { MeetingCreateService } from "@ps/domain/schedule/event/meeting/create/service.ts";
import type { HTTPRequest } from "../../../../http/request/model.ts";
import type { HTTPResponse } from "../../../../http/response/model.ts";
import type { MeetingCreateController } from "./controller.ts";
import { created } from "../../../../http/response/created/builder.ts";

export class MeetingCreateControllerImpl implements MeetingCreateController {
    constructor(private readonly meetingCreateService: MeetingCreateService) {}

    public async handle(
        userId: User["id"],
        req: HTTPRequest<MeetingCreateModel>,
    ): Promise<HTTPResponse> {
        const result = await this.meetingCreateService.create(userId, req.body);
        return created(result);
    }
}
