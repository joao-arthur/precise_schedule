import { assertEquals } from "std/testing/asserts.ts";
import { EventCreateRepositoryStub } from "./repository._stub.ts";

Deno.test("EventCreateRepositoryStub", async () => {
    assertEquals(
        await new EventCreateRepositoryStub().create(),
        undefined,
    );
});
