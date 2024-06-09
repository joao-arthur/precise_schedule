import { assertEquals } from "std/assert/assert_equals.ts";
import { eventStub } from "../../model._stub.ts";
import { BirthdayUpdateServiceStub } from "./service._stub.ts";

Deno.test("BirthdayUpdateServiceStub", async () => {
    assertEquals(
        await new BirthdayUpdateServiceStub(
            eventStub,
        ).update(),
        eventStub,
    );
});
