import { assertEquals } from "@std/assert/assert-equals";

import { eventStub } from "../model._stub.ts";
import { eventFindModelStub } from "../find/model._stub.ts";
import { EventFindServiceStub } from "../find/service._stub.ts";
import { eventUpdateModelStub } from "./model._stub.ts";
import { EventUpdateServiceImpl } from "./service.impl.ts";
import { EventUpdateFactoryStub } from "./factory._stub.ts";
import { EventUpdateRepositoryStub } from "./repository._stub.ts";

Deno.test("EventUpdateServiceImpl", async () => {
    assertEquals(
        await new EventUpdateServiceImpl(
            new EventUpdateRepositoryStub(),
            new EventUpdateFactoryStub(eventStub),
            new EventFindServiceStub(eventStub, eventFindModelStub),
        ).update(eventStub.user, eventStub.id, eventUpdateModelStub),
        eventStub,
    );
});
