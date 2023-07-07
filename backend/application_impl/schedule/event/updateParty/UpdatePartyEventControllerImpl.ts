import type { UpdatePartyEvent } from "@ps/domain/schedule/event/updateParty/UpdatePartyEvent.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { noContent } from "@ps/application/http/builder/noContent.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";
import { UpdatePartyEventServiceImpl } from "@ps/domain_impl/schedule/event/updateParty/UpdatePartyEventServiceImpl.ts";

export class UpdatePartyEventControllerImpl {
    constructor(
        private readonly service: UpdatePartyEventServiceImpl,
    ) {}

    public async handle(
        request: HTTPRequest<UpdatePartyEvent, IdParam<string>>,
    ): Promise<HTTPResponse> {
        try {
            await this.service.update(
                request.params.id,
                request.body,
            );
            return noContent();
        } catch (e: unknown) {
            if (e instanceof ValidationError) {
                return badRequest(e.result);
            }
            return internalServerError();
        }
    }
}
