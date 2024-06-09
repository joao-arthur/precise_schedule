import { assertEquals } from "std/testing/asserts.ts";
import { eventStub } from "../../model._stub.ts";
import { DateCreateServiceStub } from "./service._stub.ts";

Deno.test("DateCreateServiceStub", async () => {
    assertEquals(
        await new DateCreateServiceStub(
            eventStub,
        ).create(),
        eventStub,
    );
});
