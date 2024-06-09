import { assertEquals } from "std/assert/assert_equals.ts";
import { EventCreateRepositoryStub } from "./repository._stub.ts";

Deno.test("EventCreateRepositoryStub", async () => {
    assertEquals(
        await new EventCreateRepositoryStub().create(),
        undefined,
    );
});
