import { assertEquals } from "std/assert/assert_equals.ts";
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
