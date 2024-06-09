import { assertEquals } from "@std/assert/assert-equals";
import { EventCreateRepositoryStub } from "./repository._stub.ts";

Deno.test("EventCreateRepositoryStub", async () => {
    assertEquals(
        await new EventCreateRepositoryStub().create(),
        undefined,
    );
});
