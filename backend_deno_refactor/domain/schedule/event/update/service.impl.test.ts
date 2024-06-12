import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../model._stub.ts";
import { eventFindModelStub } from "../find/model._stub.ts";
import { EventFindServiceStub } from "../find/service._stub.ts";
import { eventUpdateModelStub } from "./model._stub.ts";
import { EventUpdateServiceImpl } from "./service.impl.ts";
import { EventUpdateRepositoryStub } from "./repository._stub.ts";
import { ok } from "../../../lang/result.ts";

Deno.test("EventUpdateServiceImpl", async () => {
    assertEquals(
        await new EventUpdateServiceImpl(
            new EventUpdateRepositoryStub(),
            new EventFindServiceStub(eventStub, eventFindModelStub),
        ).update(eventStub.user, eventStub.id, eventUpdateModelStub),
        ok(eventStub),
    );
});
