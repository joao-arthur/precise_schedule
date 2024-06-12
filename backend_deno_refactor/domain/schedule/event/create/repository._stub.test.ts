import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { EventCreateRepositoryStub } from "./repository._stub.ts";

Deno.test("EventCreateRepositoryStub", async () => {
    assertEquals(
        await new EventCreateRepositoryStub().create(),
        ok(undefined),
    );
});
