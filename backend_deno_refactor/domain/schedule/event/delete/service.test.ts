import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { eventStub } from "../model._stub.ts";
import { EventDeleteRepositoryStub } from "./repository._stub.ts";
import { eventDelete } from "./service.ts";

Deno.test("eventDelete", async () => {
    assertEquals(
        await eventDelete(
            new EventDeleteRepositoryStub(),
            eventStub.user,
            eventStub.id,
        ),
        ok(undefined),
    );
});
