import { assertEquals } from "@std/assert/assert-equals";
import { EventUpdateRepositoryStub } from "./repository._stub.ts";

Deno.test("EventUpdateRepositoryStub", async () => {
    assertEquals(
        await new EventUpdateRepositoryStub().update(),
        undefined,
    );
});
