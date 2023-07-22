import { assertEquals } from "std/testing/asserts.ts";
import { IdGeneratorStub } from "../../../generation/idGenerator/service._stub.ts";
import { createEventModelStub } from "./model._stub.ts";
import { EventCreateFactoryImpl } from "./factory.impl.ts";

Deno.test("EventCreateFactoryImpl", () => {
    assertEquals(
        new EventCreateFactoryImpl(new IdGeneratorStub("id")).build(
            "user",
            createEventModelStub,
        ),
        {
            id: "id",
            user: "user",
            createdAt: new Date(),
            updatedAt: new Date(),
            ...createEventModelStub,
        },
    );
});
