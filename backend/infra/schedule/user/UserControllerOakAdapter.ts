import type { IdParam } from "@ps/application/http/IdParam.ts";
import type { UserRepository } from "@ps/domain/schedule/user/UserRepository.ts";
import type { IdGenerator } from "@ps/domain/generation/IdGenerator.ts";
import type { Validator } from "@ps/domain/validation/Validator.ts";
import type { User } from "@ps/domain/schedule/user/User.ts";

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
import { bodyEndpoint } from "../../http/bodyEndpoint.ts";
import { paramsEndpoint } from "../../http/paramsEndpoint.ts";
import { fullEndpoint } from "../../http/fullEndpoint.ts";

export class UserControllerOakAdapter {
    constructor(
        private readonly idGenerator: IdGenerator,
        private readonly validator: Validator,
        private readonly repository: UserRepository,
    ) {}

    // deno-lint-ignore no-explicit-any
    public initRoutes(router: Router<Record<string, any>>): void {
        router
            .post(
                "/user",
                bodyEndpoint((body) => {
                    const createUserService = new CreateUserServiceImpl(
                        this.repository,
                        new UniqueInfoServiceImpl(this.repository),
                        new CreateUserFactoryImpl(this.idGenerator),
                        new CreateSessionServiceJWTAdapter(),
                        this.validator,
                    );
                    const createUserController = new CreateUserControllerImpl(
                        createUserService,
                    );
                    return createUserController.handle({ body });
                }),
            )
            .put(
                "/user/:id",
                fullEndpoint<IdParam<User["id"]>>((body, params) => {
                    const updateUserService = new UpdateUserServiceImpl(
                        this.repository,
                        new UniqueInfoServiceImpl(this.repository),
                        new UpdateUserFactoryImpl(),
                        this.validator,
                        new FindUserServiceImpl(this.repository),
                    );
                    const updateUserController = new UpdateUserControllerImpl(
                        updateUserService,
                    );
                    return updateUserController.handle({ body, params });
                }),
            )
            .get(
                "/user/:id",
                paramsEndpoint<IdParam<User["id"]>>((params) => {
                    const findUserService = new FindUserServiceImpl(this.repository);
                    const findUserController = new FindUserControllerImpl(findUserService);
                    return findUserController.handle({ params });
                }),
            )
            .post(
                "/user/login",
                bodyEndpoint((body) => {
                    const loginServiceImpl = new LoginServiceImpl(
                        this.validator,
                        new FindUserServiceImpl(this.repository),
                        new CreateSessionServiceJWTAdapter(),
                    );
                    const loginController = new LoginControllerImpl(loginServiceImpl);
                    return loginController.handle({ body });
                }),
            );
    }
}
