import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../model._stub.ts";
import { eventFindModelStub } from "./model._stub.ts";
import { EventFindServiceStub } from "./service._stub.ts";
import { ok } from "../../../lang/result.ts";

Deno.test("EventFindServiceStub", async () => {
    assertEquals(
        await new EventFindServiceStub(eventStub, eventFindModelStub).findByUserAndId(),
        ok(eventStub),
    );
});
