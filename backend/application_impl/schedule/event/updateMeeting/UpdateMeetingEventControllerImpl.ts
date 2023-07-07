import type { UpdateMeetingEvent } from "@ps/domain/schedule/event/updateMeeting/UpdateMeetingEvent.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { noContent } from "@ps/application/http/builder/noContent.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";
import { UpdateMeetingEventServiceImpl } from "@ps/domain_impl/schedule/event/updateMeeting/UpdateMeetingEventServiceImpl.ts";

export class UpdateMeetingEventControllerImpl {
    constructor(
        private readonly service: UpdateMeetingEventServiceImpl,
    ) {}

    public async handle(
        request: HTTPRequest<UpdateMeetingEvent, IdParam<string>>,
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
