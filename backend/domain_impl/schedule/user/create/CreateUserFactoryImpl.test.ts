import { assertEquals } from "std/testing/asserts.ts";
import { IdGeneratorMock } from "@ps/domain_mock/generation/IdGeneratorMock.ts";
import { createUserModelMock } from "@ps/domain_mock/schedule/user/create/CreateUserModelMock.ts";
import { CreateUserFactoryImpl } from "./CreateUserFactoryImpl.ts";

Deno.test("CreateUserFactoryImpl", () => {
    assertEquals(
        new CreateUserFactoryImpl(new IdGeneratorMock("id")).build(
            createUserModelMock,
        ),
        { id: "id", ...createUserModelMock },
    );
});
