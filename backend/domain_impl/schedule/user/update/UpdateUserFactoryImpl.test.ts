import { assertEquals } from "std/testing/asserts.ts";
import { updateUserModelMock } from "@ps/domain_mock/schedule/user/update/UpdateUserModelMock.ts";
import { UpdateUserFactoryImpl } from "./UpdateUserFactoryImpl.ts";
import { userMock } from "@ps/domain_mock/schedule/user/UserMock.ts";

Deno.test("UpdateUserFactoryImpl", () => {
    assertEquals(
        new UpdateUserFactoryImpl().build(updateUserModelMock, userMock),
        {
            id: "id",
            createdAt: userMock.createdAt,
            updatedAt: new Date(),
            ...updateUserModelMock,
        },
    );
});
