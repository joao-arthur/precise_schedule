import { assertEquals } from "std/testing/asserts.ts";

import { userMock } from "@ps/domain_mock/schedule/user/UserMock.ts";
import { ValidatorMock } from "@ps/domain_mock/validation/ValidatorMock.ts";
import { UniqueInfoServiceMock } from "@ps/domain_mock/schedule/user/uniqueInfo/UniqueInfoServiceMock.ts";
import { FindUserServiceMock } from "@ps/domain_mock/schedule/user/find/FindUserServiceMock.ts";
import { UpdateUserFactoryMock } from "@ps/domain_mock/schedule/user/update/UpdateUserFactoryMock.ts";
import { updateUserModelMock } from "@ps/domain_mock/schedule/user/update/UpdateUserModelMock.ts";
import { UpdateUserRepositoryMock } from "@ps/domain_mock/schedule/user/update/UpdateUserRepositoryMock.ts";
import { UpdateUserServiceImpl } from "./UpdateUserServiceImpl.ts";

Deno.test("UpdateUserServiceImpl", async () => {
    assertEquals(
        await new UpdateUserServiceImpl(
            new UpdateUserRepositoryMock(),
            new UniqueInfoServiceMock(),
            new UpdateUserFactoryMock(userMock),
            new ValidatorMock(),
            new FindUserServiceMock(userMock),
        ).update(userMock.id, updateUserModelMock),
        userMock,
    );
});
