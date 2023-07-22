import { assertEquals } from "std/testing/asserts.ts";
import { EventUpdateRepositoryStub } from "./repository._stub.ts";

Deno.test("EventUpdateRepositoryStub", async () => {
    assertEquals(
        await new EventUpdateRepositoryStub().update(),
        undefined,
    );
});
