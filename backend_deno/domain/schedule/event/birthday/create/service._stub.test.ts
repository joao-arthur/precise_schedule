import { assertEquals } from "std/assert/assert_equals.ts";
import { eventStub } from "../../model._stub.ts";
import { BirthdayCreateServiceStub } from "./service._stub.ts";

Deno.test("BirthdayCreateServiceStub", async () => {
    assertEquals(
        await new BirthdayCreateServiceStub(
            eventStub,
        ).create(),
        eventStub,
    );
});
