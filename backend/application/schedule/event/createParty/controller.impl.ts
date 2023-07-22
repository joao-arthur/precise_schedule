import type { User } from "@ps/domain/schedule/user/model.ts";
import type { PartyCreateModel } from "@ps/domain/schedule/event/party/create/model.ts";
import type { PartyCreateService } from "@ps/domain/schedule/event/party/create/service.ts";
import type { HTTPRequest } from "../../../http/request/model.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";
import type { PartyCreateController } from "./controller.ts";

import { created } from "../../../http/response/created/builder.ts";

export class PartyCreateControllerImpl implements PartyCreateController {
    constructor(private readonly partyCreateService: PartyCreateService) {}

    public async handle(
        userId: User["id"],
        req: HTTPRequest<PartyCreateModel>,
    ): Promise<HTTPResponse> {
        const result = await this.partyCreateService.create(userId, req.body);
        return created(result);
    }
}
