import type { UserCreate } from "@ps/domain/schedule/user/create/model.ts";
import type { UserCreateService } from "@ps/domain/schedule/user/create/service.ts";
import type { HTTPRequest } from "../../../http/request/model.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";
import type { UserCreateController } from "./controller.ts";
import { ok } from "../../../http/response/ok/builder.ts";

export class UserCreateControllerImpl implements UserCreateController {
    constructor(private readonly userCreateService: UserCreateService) { }

    public async handle(req: HTTPRequest<UserCreate>): Promise<HTTPResponse> {
        const result = await this.userCreateService.create(req.body);
        return ok(result);
    }
}
