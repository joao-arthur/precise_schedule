import type { UserRepository } from "../../../../domain/schedule/user/repository.ts";
import type { IdGenerator } from "@ps/domain/generation/idGenerator/service.ts";
import type { Validator } from "@ps/domain/validation/service.ts";

import { Router } from "oak/mod.ts";
import { UserCreateServiceImpl } from "@ps/domain/schedule/user/create/service.impl.ts";
import { UserUpdateServiceImpl } from "@ps/domain/schedule/user/update/service.impl.ts";
import { UserUniqueInfoServiceImpl } from "@ps/domain/schedule/user/uniqueInfo/service.impl.ts";
import { UserCreateFactoryImpl } from "@ps/domain/schedule/user/create/factory.impl.ts";
import { UserUpdateFactoryImpl } from "@ps/domain/schedule/user/update/factory.impl.ts";
import { UserFindServiceImpl } from "@ps/domain/schedule/user/find/service.impl.ts";
import { UserLoginServiceImpl } from "@ps/domain/schedule/user/login/service.impl.ts";
import { UserCreateControllerImpl } from "@ps/application/schedule/user/create/controller.impl.ts";
import { UserUpdateControllerImpl } from "@ps/application/schedule/user/update/controller.impl.ts";
import { UserFindControllerImpl } from "@ps/application/schedule/user/find/controller.impl.ts";
import { UserLoginControllerImpl } from "@ps/application/schedule/user/login/controller.impl.ts";
import { SessionCreateServiceJWTAdapter } from "@ps/infra/session/create/jwt.adapter.ts";
import { DecodeSessionServiceJWTAdapter } from "@ps/infra/session/decode/jwt.adapter.ts";
import { makeBody } from "../../../http/makeBody.ts";
import { makeResult } from "../../../http/makeResult.ts";

export class UserControllerOakAdapter {
    constructor(
        private readonly idGenerator: IdGenerator,
        private readonly validator: Validator,
        private readonly repository: UserRepository,
    ) {}

    // deno-lint-ignore no-explicit-any
    public initRoutes(router: Router<Record<string, any>>): void {
        router
            .post("/user", async (ctx) => {
                const body = await makeBody(ctx);
                const service = new UserCreateServiceImpl(
                    this.repository,
                    new UserUniqueInfoServiceImpl(this.repository),
                    new UserCreateFactoryImpl(this.idGenerator),
                    new SessionCreateServiceJWTAdapter(),
                    this.validator,
                );
                const controller = new UserCreateControllerImpl(service);
                const res = await controller.handle({ body });
                makeResult(res, ctx);
            })
            .put("/user", async (ctx) => {
                const userId = await new DecodeSessionServiceJWTAdapter().decode({
                    token: ctx.request.headers.get("authorization")!,
                });
                const body = await makeBody(ctx);
                const service = new UserUpdateServiceImpl(
                    this.repository,
                    new UserUniqueInfoServiceImpl(this.repository),
                    new UserUpdateFactoryImpl(),
                    this.validator,
                    new UserFindServiceImpl(this.repository),
                );
                const controller = new UserUpdateControllerImpl(service);
                const res = await controller.handle(userId, { body });
                makeResult(res, ctx);
            })
            .get("/user", async (ctx) => {
                const userId = await new DecodeSessionServiceJWTAdapter().decode({
                    token: ctx.request.headers.get("authorization")!,
                });
                const service = new UserFindServiceImpl(this.repository);
                const controller = new UserFindControllerImpl(service);
                const res = await controller.handle(userId);
                makeResult(res, ctx);
            })
            .post("/user/login", async (ctx) => {
                const body = await makeBody(ctx);
                const service = new UserLoginServiceImpl(
                    this.validator,
                    new UserFindServiceImpl(this.repository),
                    new SessionCreateServiceJWTAdapter(),
                );
                const controller = new UserLoginControllerImpl(service);
                const res = await controller.handle({ body });
                makeResult(res, ctx);
            });
    }
}
