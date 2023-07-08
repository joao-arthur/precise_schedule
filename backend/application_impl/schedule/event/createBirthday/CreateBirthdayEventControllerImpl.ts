import type { CreateBirthdayEvent } from "@ps/domain/schedule/event/createBirthday/CreateBirthdayEvent.ts";
import type { CreateBirthdayEventService } from "@ps/domain/schedule/event/createBirthday/CreateBirthdayEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { CreateBirthdayEventController } from "@ps/application/schedule/event/createBirthday/CreateBirthdayEventController.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { created } from "@ps/application/http/builder/created.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";

export class CreateBirthdayEventControllerImpl
    implements CreateBirthdayEventController {
    constructor(
        private readonly createBirthdayEventService:
            CreateBirthdayEventService,
    ) {}

    public async handle(
        request: HTTPRequest<CreateBirthdayEvent, undefined>,
    ): Promise<HTTPResponse> {
        try {
            await this.createBirthdayEventService.create(
                request.body,
            );
            return created();
        } catch (e: unknown) {
            if (e instanceof ValidationError) {
                return badRequest(e.result);
            }
            return internalServerError();
        }
    }
}
