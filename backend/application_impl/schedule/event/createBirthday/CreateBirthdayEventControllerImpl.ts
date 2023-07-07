import type { CreateBirthdayEvent } from "@ps/domain/schedule/event/createBirthday/CreateBirthdayEvent.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { created } from "@ps/application/http/builder/created.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";
import { CreateBirthdayEventServiceImpl } from "@ps/domain_impl/schedule/event/createBirthday/CreateBirthdayEventServiceImpl.ts";

export class CreateBirthdayEventControllerImpl {
    constructor(
        private readonly service: CreateBirthdayEventServiceImpl,
    ) {}

    public async handle(
        request: HTTPRequest<CreateBirthdayEvent, never>,
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
