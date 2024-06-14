import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { eventStub } from "../model._stub.ts";
import { eventUpdateModelStub } from "./model._stub.ts";
import { EventUpdateRepositoryStub } from "./repository._stub.ts";
import { eventUpdate } from "./service.ts";

Deno.test("eventUpdate", async () => {
    assertEquals(
        await eventUpdate(
            new EventUpdateRepositoryStub(),
            eventStub.user,
            eventStub.id,
            eventUpdateModelStub,
        ),
        ok(eventStub),
    );
});
