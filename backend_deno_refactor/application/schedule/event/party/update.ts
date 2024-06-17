import type { User } from "@ps/domain/schedule/user/model.ts";
import type { PartyUpdateModel } from "@ps/domain/schedule/event/party/update/model.ts";
import type { PartyUpdateService } from "@ps/domain/schedule/event/party/update/service.ts";
import type { HTTPRequest } from "../../../../http/request/model.ts";
import type { HTTPResponse } from "../../../../http/response/model.ts";
import type { IdParam } from "../../../../http/IdParam.ts";
import type { PartyUpdateController } from "./controller.ts";
import { noContent } from "../../../../http/response/noContent/builder.ts";

export class PartyUpdateControllerImpl implements PartyUpdateController {
    constructor(private readonly partyUpdateService: PartyUpdateService) { }

    public async handle(
        userId: User["id"],
        req: HTTPRequest<PartyUpdateModel, IdParam>,
    ): Promise<HTTPResponse> {
        await this.partyUpdateService.update(userId, req.params.id, req.body);
        return noContent();
    }
}
