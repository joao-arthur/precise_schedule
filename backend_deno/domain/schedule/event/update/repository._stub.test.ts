import { assertEquals } from "std/assert/assert_equals.ts";
import { EventUpdateRepositoryStub } from "./repository._stub.ts";

Deno.test("EventUpdateRepositoryStub", async () => {
    assertEquals(
        await new EventUpdateRepositoryStub().update(),
        undefined,
    );
});
