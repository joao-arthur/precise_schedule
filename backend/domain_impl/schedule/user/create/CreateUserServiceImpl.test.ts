import { assertEquals } from "std/testing/asserts.ts";
import { ValidatorMock } from "@ps/domain_mock/validation/ValidatorMock.ts";
import { userMock } from "@ps/domain_mock/schedule/user/UserMock.ts";
import { UniqueInfoServiceMock } from "@ps/domain_mock/schedule/user/uniqueInfo/UniqueInfoServiceMock.ts";
import { CreateUserFactoryMock } from "@ps/domain_mock/schedule/user/create/CreateUserFactoryMock.ts";
import { CreateUserRepositoryMock } from "@ps/domain_mock/schedule/user/create/CreateUserRepositoryMock.ts";
import { createUserModelMock } from "@ps/domain_mock/schedule/user/create/CreateUserModelMock.ts";
import { CreateUserServiceImpl } from "./CreateUserServiceImpl.ts";

Deno.test("CreateUserServiceImpl", () => {
    assertEquals(
        new CreateUserServiceImpl(
            new CreateUserRepositoryMock(),
            new UniqueInfoServiceMock(),
            new CreateUserFactoryMock(userMock),
            new ValidatorMock(),
        ).create(createUserModelMock),
        userMock,
    );
});
