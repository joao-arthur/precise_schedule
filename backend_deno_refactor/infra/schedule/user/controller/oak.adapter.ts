import type { UserRepository } from "../../../domain/schedule/user/repository.ts";
import type { IdGenerator } from "../../../domain/generator/id/service.ts";
import type { ValidatorService } from "../../../domain/validation/validator/service.ts";
import { Router } from "oak/mod.ts";
import { UserCreateServiceImpl } from "../../../domain/schedule/user/create/service.impl.ts";
import { UserCreateFactoryImpl } from "../../../domain/schedule/user/create/factory.ts";
import { UserUpdateServiceImpl } from "../../../domain/schedule/user/update/service.impl.ts";
import { UserUpdateFactoryImpl } from "../../../domain/schedule/user/update/factory.ts";
import { UserFindServiceImpl } from "../../../domain/schedule/user/find/service.impl.ts";
import { UserFindFactoryImpl } from "../../../domain/schedule/user/find/factory.ts";
import { UserUniqueInfoServiceImpl } from "../../../domain/schedule/user/uniqueInfo/service.impl.ts";
import { UserLoginServiceImpl } from "../../../domain/schedule/user/login/service.impl.ts";
import { UserCreateControllerImpl } from "@ps/application/schedule/user/create/controller.ts";
import { UserUpdateControllerImpl } from "@ps/application/schedule/user/update/controller.ts";
import { UserFindControllerImpl } from "@ps/application/schedule/user/find/controller.ts";
import { UserLoginControllerImpl } from "@ps/application/schedule/user/login/controller.ts";
import { SessionCreateServiceJWTAdapter } from "../../../session/create/jwt.adapter.ts";
import { makeBody } from "../../../http/makeBody.ts";
import { makeResult } from "../../../http/makeResult.ts";
import { makeUserId } from "../../../http/makeUserId.ts";

export class UserControllerOakAdapter {
    constructor(
        private readonly idGenerator: IdGenerator,
        private readonly validator: ValidatorService,
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
                const userId = await makeUserId(ctx);
                const body = await makeBody(ctx);
                const service = new UserUpdateServiceImpl(
                    this.repository,
                    new UserUniqueInfoServiceImpl(this.repository),
                    new UserUpdateFactoryImpl(),
                    this.validator,
                    new UserFindServiceImpl(new UserFindFactoryImpl(), this.repository),
                );
                const controller = new UserUpdateControllerImpl(service);
                const res = await controller.handle(userId, { body });
                makeResult(res, ctx);
            })
            .get("/user", async (ctx) => {
                const userId = await makeUserId(ctx);
                const service = new UserFindServiceImpl(new UserFindFactoryImpl(), this.repository);
                const controller = new UserFindControllerImpl(service);
                const res = await controller.handle(userId);
                makeResult(res, ctx);
            })
            .post("/user/login", async (ctx) => {
                const body = await makeBody(ctx);
                const service = new UserLoginServiceImpl(
                    this.validator,
                    new UserFindServiceImpl(new UserFindFactoryImpl(), this.repository),
                    new SessionCreateServiceJWTAdapter(),
                );
                const controller = new UserLoginControllerImpl(service);
                const res = await controller.handle({ body });
                makeResult(res, ctx);
            });
    }
}
