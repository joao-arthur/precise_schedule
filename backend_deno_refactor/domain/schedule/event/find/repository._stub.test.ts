import { assertEquals } from "std/testing/asserts.ts";
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
