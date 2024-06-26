import { assertEquals } from "@std/assert/assert-equals";
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
