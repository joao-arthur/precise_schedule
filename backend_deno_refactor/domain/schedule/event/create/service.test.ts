import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { eventStub } from "../model._stub.ts";
import { createEventModelStub } from "./model._stub.ts";
import { EventCreateRepositoryStub } from "./repo._stub.ts";
import { eventCreate } from "./service.ts";
import { IdGeneratorStub } from "../../../generator/id/service._stub.ts";

Deno.test("eventCreate", async () => {
    assertEquals(
        await eventCreate(
            new EventCreateRepositoryStub(),
            new IdGeneratorStub("event-id"),
            createEventModelStub,
            "user-id",
        ),
        ok(eventStub),
    );
});
