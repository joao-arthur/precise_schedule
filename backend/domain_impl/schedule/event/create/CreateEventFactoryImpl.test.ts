import { assertEquals } from "std/testing/asserts.ts";
import { IdGeneratorMock } from "@ps/domain_mock/generation/IdGeneratorMock.ts";
import { createEventModelMock } from "@ps/domain_mock/schedule/event/create/CreateEventModelMock.ts";
import { CreateEventFactoryImpl } from "./CreateEventFactoryImpl.ts";

Deno.test("CreateEventFactoryImpl", () => {
    assertEquals(
        new CreateEventFactoryImpl(new IdGeneratorMock("id")).build(
            createEventModelMock,
        ),
        {
            id: "id",
            createdAt: new Date(),
            updatedAt: new Date(),
            ...createEventModelMock,
        },
    );
});
