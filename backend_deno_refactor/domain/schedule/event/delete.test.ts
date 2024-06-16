import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { eventStub } from "../model.stub.ts";
import { EventDeleteRepositoryStub } from "./repo.stub.ts";
import { eventDelete } from "./delete.ts";

Deno.test("eventDelete", async () => {
    assertEquals(
        await eventDelete(
            new EventRepo(),
            eventStub.user,
            eventStub.id,
        ),
        ok(undefined),
    );
});
