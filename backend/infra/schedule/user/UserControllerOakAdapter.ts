import type { UserRepository } from "@ps/domain/schedule/user/UserRepository.ts";
import type { IdGenerator } from "@ps/domain/generation/IdGenerator.ts";
import type { Validator } from "@ps/domain/validation/Validator.ts";

import { Router } from "oak/mod.ts";
import { CreateUserServiceImpl } from "@ps/domain_impl/schedule/user/create/CreateUserServiceImpl.ts";
import { UpdateUserServiceImpl } from "@ps/domain_impl/schedule/user/update/UpdateUserServiceImpl.ts";
import { UniqueInfoServiceImpl } from "@ps/domain_impl/schedule/user/uniqueInfo/UniqueInfoServiceImpl.ts";
import { CreateUserFactoryImpl } from "@ps/domain_impl/schedule/user/create/CreateUserFactoryImpl.ts";
import { UpdateUserFactoryImpl } from "@ps/domain_impl/schedule/user/update/UpdateUserFactoryImpl.ts";
import { FindUserServiceImpl } from "@ps/domain_impl/schedule/user/find/FindUserServiceImpl.ts";
import { LoginServiceImpl } from "@ps/domain_impl/schedule/user/login/LoginServiceImpl.ts";
import { CreateUserControllerImpl } from "@ps/application_impl/schedule/user/create/CreateUserControllerImpl.ts";
import { UpdateUserControllerImpl } from "@ps/application_impl/schedule/user/update/UpdateUserControllerImpl.ts";
import { FindUserControllerImpl } from "@ps/application_impl/schedule/user/find/FindUserControllerImpl.ts";
import { LoginControllerImpl } from "@ps/application_impl/schedule/user/login/LoginControllerImpl.ts";
import { CreateSessionServiceJWTAdapter } from "@ps/infra/session/create/CreateSessionServiceJWTAdapter.ts";
import { makeBody } from "../../http/makeBody.ts";
import { makeParams } from "../../http/makeParams.ts";
import { makeResult } from "../../http/makeResult.ts";

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
                const createUserService = new CreateUserServiceImpl(
                    this.repository,
                    new UniqueInfoServiceImpl(this.repository),
                    new CreateUserFactoryImpl(this.idGenerator),
                    new CreateSessionServiceJWTAdapter(),
                    this.validator,
                );
                const createUserController = new CreateUserControllerImpl(createUserService);
                const res = await createUserController.handle({ body });
                makeResult(res, ctx);
            })
            .put("/user/:id", async (ctx) => {
                const body = await makeBody(ctx);
                const params = await makeParams(ctx);
                const updateUserService = new UpdateUserServiceImpl(
                    this.repository,
                    new UniqueInfoServiceImpl(this.repository),
                    new UpdateUserFactoryImpl(),
                    this.validator,
                    new FindUserServiceImpl(this.repository),
                );
                const updateUserController = new UpdateUserControllerImpl(updateUserService);
                const res = await updateUserController.handle({ body, params });
                makeResult(res, ctx);
            })
            .get("/user/:id", async (ctx) => {
                const params = await makeParams(ctx);
                const findUserService = new FindUserServiceImpl(this.repository);
                const findUserController = new FindUserControllerImpl(findUserService);
                const res = await findUserController.handle({ params });
                makeResult(res, ctx);
            })
            .post("/user/login", async (ctx) => {
                const body = await makeBody(ctx);
                const loginServiceImpl = new LoginServiceImpl(
                    this.validator,
                    new FindUserServiceImpl(this.repository),
                    new CreateSessionServiceJWTAdapter(),
                );
                const loginController = new LoginControllerImpl(loginServiceImpl);
                const res = await loginController.handle({ body });
                makeResult(res, ctx);
            });
    }
}
