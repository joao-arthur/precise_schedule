import { assertEquals } from "std/assert/assert_equals.ts";
import { eventStub } from "../model._stub.ts";
import { eventFindModelStub } from "./model._stub.ts";
import { EventFindServiceStub } from "./service._stub.ts";

Deno.test("EventFindServiceStub", async () => {
    assertEquals(
        await new EventFindServiceStub(eventStub, eventFindModelStub).findByUserAndId(),
        eventStub,
    );
});
