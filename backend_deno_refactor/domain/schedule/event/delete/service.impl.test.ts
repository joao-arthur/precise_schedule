import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../model._stub.ts";
import { eventFindModelStub } from "../../../schedule/event/find/model._stub.ts";
import { EventFindServiceStub } from "../find/service._stub.ts";
import { EventDeleteServiceImpl } from "./service.impl.ts";
import { EventDeleteRepositoryStub } from "./repository._stub.ts";

Deno.test("EventDeleteServiceImpl", async () => {
    assertEquals(
        await new EventDeleteServiceImpl(
            new EventDeleteRepositoryStub(),
            new EventFindServiceStub(eventStub, eventFindModelStub),
        ).del(eventStub.user, eventStub.id),
        undefined,
    );
});
