import { assertEquals } from "std/testing/asserts.ts";
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
