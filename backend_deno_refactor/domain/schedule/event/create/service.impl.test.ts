import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../model._stub.ts";
import { createEventModelStub } from "./model._stub.ts";
import { EventCreateRepositoryStub } from "./repository._stub.ts";
import { EventCreateFactoryStub } from "./factory._stub.ts";
import { EventCreateServiceImpl } from "./service.impl.ts";
import { buildOk } from "../../../lang/result.ts";

Deno.test("EventCreateServiceImpl", async () => {
    assertEquals(
        await new EventCreateServiceImpl(
            new EventCreateRepositoryStub(),
            new EventCreateFactoryStub(eventStub),
        ).create(eventStub.user, createEventModelStub),
        buildOk(eventStub),
    );
});
