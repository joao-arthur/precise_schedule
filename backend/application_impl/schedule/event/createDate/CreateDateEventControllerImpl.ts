import type { CreateDateEvent } from "@ps/domain/schedule/event/createDate/CreateDateEvent.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { CreateDateEventController } from "@ps/application/schedule/event/createDate/CreateDateEventController.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { created } from "@ps/application/http/builder/created.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";
import { CreateDateEventServiceImpl } from "@ps/domain_impl/schedule/event/createDate/CreateDateEventServiceImpl.ts";

export class CreateDateEventControllerImpl
    implements CreateDateEventController {
    constructor(
        private readonly service: CreateDateEventServiceImpl,
    ) {}

    public async handle(
        request: HTTPRequest<CreateDateEvent, undefined>,
    ): Promise<HTTPResponse> {
        try {
            await this.service.create(request.body);
            return created();
        } catch (e: unknown) {
            if (e instanceof ValidationError) {
                return badRequest(e.result);
            }
            return internalServerError();
        }
    }
}
