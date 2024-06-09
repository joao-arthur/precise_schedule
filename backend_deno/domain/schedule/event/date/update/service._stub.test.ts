import { assertEquals } from "std/assert/assert_equals.ts";
import { eventStub } from "../../model._stub.ts";
import { DateUpdateServiceStub } from "./service._stub.ts";

Deno.test("DateUpdateServiceStub", async () => {
    assertEquals(
        await new DateUpdateServiceStub(
            eventStub,
        ).update(),
        eventStub,
    );
});
