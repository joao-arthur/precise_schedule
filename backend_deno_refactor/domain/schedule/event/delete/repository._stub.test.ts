import { assertEquals } from "std/testing/asserts.ts";
import { EventDeleteRepositoryStub } from "./repository._stub.ts";

Deno.test("EventDeleteRepositoryStub", async () => {
    assertEquals(
        await new EventDeleteRepositoryStub().del(),
        undefined,
    );
});
