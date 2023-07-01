import { assertEquals } from "std/testing/asserts.ts";
import { updateUserModelMock } from "@ps/domain_mock/schedule/user/update/UpdateUserModelMock.ts";
import { UpdateUserFactoryImpl } from "./UpdateUserFactoryImpl.ts";

Deno.test("UpdateUserFactoryImpl", () => {
    assertEquals(
        new UpdateUserFactoryImpl().build(
            updateUserModelMock,
            "id",
        ),
        { id: "id", ...updateUserModelMock },
    );
});
