import { assertEquals } from "std/assert/assert_equals.ts";
import { EventDeleteRepositoryStub } from "./repository._stub.ts";

Deno.test("EventDeleteRepositoryStub", async () => {
    assertEquals(
        await new EventDeleteRepositoryStub().del(),
        undefined,
    );
});
