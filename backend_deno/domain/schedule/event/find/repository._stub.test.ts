import { assertEquals } from "std/assert/assert_equals.ts";
import { eventStub } from "../model._stub.ts";
import { EventFindRepositoryStub } from "./repository._stub.ts";

Deno.test("EventFindRepositoryStub", async () => {
    assertEquals(
        await new EventFindRepositoryStub(undefined).findByUserAndId(),
        undefined,
    );
    assertEquals(
        await new EventFindRepositoryStub(eventStub).findByUserAndId(),
        eventStub,
    );
});
