import { RouterContext } from "oak/mod.ts";
import { CreateUserModel } from "@ps/domain/schedule/user/create/CreateUserModel.ts";
import { CreateUserServiceImpl } from "@ps/domain_impl/schedule/user/create/CreateUserServiceImpl.ts";
import { UpdateUserServiceImpl } from "@ps/domain_impl/schedule/user/update/UpdateUserServiceImpl.ts";
import { UniqueInfoServiceImpl } from "@ps/domain_impl/schedule/user/uniqueInfo/UniqueInfoServiceImpl.ts";
import { CreateUserFactoryImpl } from "@ps/domain_impl/schedule/user/create/CreateUserFactoryImpl.ts";
import { UpdateUserFactoryImpl } from "@ps/domain_impl/schedule/user/update/UpdateUserFactoryImpl.ts";
import { FindUserServiceImpl } from "@ps/domain_impl/schedule/user/find/FindUserServiceImpl.ts";
import { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import { IdParam } from "@ps/application/http/IdParam.ts";
import { CreateUserControllerImpl } from "@ps/application_impl/schedule/user/create/CreateUserControllerImpl.ts";
import { UpdateUserControllerImpl } from "@ps/application_impl/schedule/user/update/UpdateUserControllerImpl.ts";
import { FindUserControllerImpl } from "@ps/application_impl/schedule/user/find/FindUserControllerImpl.ts";
import { UserRepository } from "@ps/domain/schedule/user/UserRepository.ts";
import { IdGenerator } from "@ps/domain/generation/IdGenerator.ts";
import { Validator } from "@ps/domain/validation/Validator.ts";

type UserContext = RouterContext<
    "/user",
    Record<string | number, string | undefined>,
    Record<string, any>
>;

type UserIdContext = RouterContext<
    "/user/:id",
    {
        id: string;
    } & Record<string | number, string | undefined>,
    Record<string, any>
>;

export class UserControllerOakAdapter {
    constructor(
        private readonly idGenerator: IdGenerator,
        private readonly validator: Validator,
        private readonly repository: UserRepository,
    ) {}

    public async postUser(context: UserContext): Promise<void> {
        const createUserService = new CreateUserServiceImpl(
            this.repository,
            new UniqueInfoServiceImpl(this.repository),
            new CreateUserFactoryImpl(this.idGenerator),
            this.validator,
        );
        const createUserController = new CreateUserControllerImpl(
            createUserService,
        );
        const body = await context.request.body({ type: "json" })
            .value;
        const response = createUserController.handle(
            { body } as HTTPRequest<CreateUserModel, never>,
        );
        context.response.body = response.body;
        context.response.status = response.status;
    }

    public async putUser(context: UserIdContext): Promise<void> {
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
        const body = await context.request.body({ type: "json" })
            .value;
        const params = { id: context.params.id };
        const response = updateUserController.handle(
            { body, params },
        );
        context.response.body = response.body;
        context.response.status = response.status;
    }

    public async getUser(context: UserIdContext): Promise<void> {
        const findUserService = new FindUserServiceImpl(
            this.repository,
        );
        const findUserController = new FindUserControllerImpl(
            findUserService,
        );
        const params = {
            id: context.params.id,
        };
        const response = findUserController.handle(
            { params } as HTTPRequest<never, IdParam<string>>,
        );
        context.response.body = response.body;
        context.response.status = response.status;
    }
}
