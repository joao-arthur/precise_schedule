import { assertEquals } from "std/testing/asserts.ts";
import { eventStub } from "../../model._stub.ts";
import { MeetingUpdateServiceStub } from "./service._stub.ts";

Deno.test("MeetingUpdateServiceStub", async () => {
    assertEquals(
        await new MeetingUpdateServiceStub(
            eventStub,
        ).update(),
        eventStub,
    );
});
