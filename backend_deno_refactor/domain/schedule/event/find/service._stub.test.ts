import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../model._stub.ts";
import { eventFindModelStub } from "./model._stub.ts";
import { EventFindServiceStub } from "./service._stub.ts";
import { buildOk } from "../../../lang/result.ts";

Deno.test("EventFindServiceStub", async () => {
    assertEquals(
        await new EventFindServiceStub(eventStub, eventFindModelStub).findByUserAndId(),
        buildOk(eventStub),
    );
});
