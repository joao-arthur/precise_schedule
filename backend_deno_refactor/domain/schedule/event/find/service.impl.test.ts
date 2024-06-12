import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../model._stub.ts";
import { EventFindRepositoryStub } from "./repository._stub.ts";
import { EventNotFound } from "./error.eventNotFound.ts";
import { eventFindModelStub } from "./model._stub.ts";
import { EventFindServiceImpl } from "./service.impl.ts";
import { EventFindFactoryStub } from "./factory._stub.ts";
import { buildErr, buildOk } from "../../../lang/result.ts";

Deno.test("EventFindServiceImpl.findByUser", async () => {
    assertEquals(
        await new EventFindServiceImpl(
            new EventFindFactoryStub(eventFindModelStub),
            new EventFindRepositoryStub(undefined),
        ).findByUser(eventStub.user),
        buildOk([]),
    );
    assertEquals(
        await new EventFindServiceImpl(
            new EventFindFactoryStub(eventFindModelStub),
            new EventFindRepositoryStub(eventStub),
        ).findByUser(eventStub.user),
        buildOk([eventStub]),
    );
});

Deno.test("EventFindServiceImpl.findByUserMapped", async () => {
    assertEquals(
        await new EventFindServiceImpl(
            new EventFindFactoryStub(eventFindModelStub),
            new EventFindRepositoryStub(undefined),
        ).findByUserMapped(eventStub.user),
        buildOk([]),
    );
    assertEquals(
        await new EventFindServiceImpl(
            new EventFindFactoryStub(eventFindModelStub),
            new EventFindRepositoryStub(eventStub),
        ).findByUserMapped(eventStub.user),
        buildOk([eventFindModelStub]),
    );
});

Deno.test("EventFindServiceImpl.findByUserAndId", async () => {
    assertEquals(
        await new EventFindServiceImpl(
            new EventFindFactoryStub(eventFindModelStub),
            new EventFindRepositoryStub(undefined),
        ).findByUserAndId(eventStub.user, eventStub.id),
        buildErr(new EventNotFound()),
    );
    assertEquals(
        await new EventFindServiceImpl(
            new EventFindFactoryStub(eventFindModelStub),
            new EventFindRepositoryStub(eventStub),
        ).findByUserAndId(eventStub.user, eventStub.id),
        buildOk(eventStub),
    );
});

Deno.test("EventFindServiceImpl.findByUserAndIdMapped", async () => {
    assertEquals(
        await new EventFindServiceImpl(
            new EventFindFactoryStub(eventFindModelStub),
            new EventFindRepositoryStub(undefined),
        ).findByUserAndIdMapped(eventStub.user, eventStub.id),
        buildErr(new EventNotFound()),
    );
    assertEquals(
        await new EventFindServiceImpl(
            new EventFindFactoryStub(eventFindModelStub),
            new EventFindRepositoryStub(eventStub),
        ).findByUserAndIdMapped(eventStub.user, eventStub.id),
        buildOk(eventFindModelStub),
    );
});
