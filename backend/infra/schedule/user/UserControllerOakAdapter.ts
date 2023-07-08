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

import { SessionMiddlewareImpl } from "@ps/application_impl/http/middleware/SessionMiddlewareImpl.ts";
import { ValidateUserSessionServiceImpl } from "@ps/domain_impl/schedule/userSession/ValidateUserSessionServiceImpl.ts";
import { DecodeSessionServiceJWTAdapter } from "@ps/infra/session/decode/DecodeSessionServiceJWTAdapter.ts";

export class UserControllerOakAdapter {
    constructor(
        private readonly idGenerator: IdGenerator,
        private readonly validator: Validator,
        private readonly repository: UserRepository,
    ) {}

    public initRoutes(router: Router<Record<string, any>>): void {
        router
            .post("/user", async (context) => {
                const createUserService = new CreateUserServiceImpl(
                    this.repository,
                    new UniqueInfoServiceImpl(this.repository),
                    new CreateUserFactoryImpl(this.idGenerator),
                    new CreateSessionServiceJWTAdapter(),
                    this.validator,
                );
                const createUserController =
                    new CreateUserControllerImpl(
                        createUserService,
                    );
                const body = await context.request.body({
                    type: "json",
                })
                    .value;
                const response = await createUserController.handle({
                    body,
                });
                context.response.body = response.body;
                context.response.status = response.status;
            })
            .put("/user/:id", async (context) => {
                new SessionMiddlewareImpl(
                    new ValidateUserSessionServiceImpl(
                        new FindUserServiceImpl(this.repository),
                        new DecodeSessionServiceJWTAdapter(),
                    ),
                ).handle({
                    headers: {
                        Authorization: context.request.headers.get(
                            "Authorization",
                        ),
                    },
                });
                const updateUserService = new UpdateUserServiceImpl(
                    this.repository,
                    new UniqueInfoServiceImpl(this.repository),
                    new UpdateUserFactoryImpl(),
                    this.validator,
                    new FindUserServiceImpl(this.repository),
                );
                const updateUserController =
                    new UpdateUserControllerImpl(
                        updateUserService,
                    );
                const body = await context.request.body({
                    type: "json",
                })
                    .value;
                const params = { id: context.params.id };
                const response = await updateUserController.handle({
                    body,
                    params,
                });
                context.response.body = response.body;
                context.response.status = response.status;
            })
            .get("/user/:id", async (context) => {
                new SessionMiddlewareImpl(
                    new ValidateUserSessionServiceImpl(
                        new FindUserServiceImpl(this.repository),
                        new DecodeSessionServiceJWTAdapter(),
                    ),
                ).handle({
                    headers: {
                        Authorization: context.request.headers.get(
                            "Authorization",
                        ),
                    },
                });
                const findUserService = new FindUserServiceImpl(
                    this.repository,
                );
                const findUserController = new FindUserControllerImpl(
                    findUserService,
                );
                const params = {
                    id: context.params.id,
                };
                const response = await findUserController.handle(
                    { params },
                );
                context.response.body = response.body;
                context.response.status = response.status;
            })
            .post("/user/login", async (context) => {
                const loginServiceImpl = new LoginServiceImpl(
                    this.validator,
                    new FindUserServiceImpl(this.repository),
                    new CreateSessionServiceJWTAdapter(),
                );
                const loginController = new LoginControllerImpl(
                    loginServiceImpl,
                );
                const body = await context.request.body({
                    type: "json",
                })
                    .value;
                const response = await loginController.handle({
                    body,
                });
                context.response.body = response.body;
                context.response.status = response.status;
            });
    }
}
