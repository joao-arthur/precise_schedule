import { assertEquals } from "@std/assert/assert-equals";
import { EventUpdateRepositoryStub } from "./repository._stub.ts";
import { ok } from "../../../lang/result.ts";

Deno.test("EventUpdateRepositoryStub", async () => {
    assertEquals(
        await new EventUpdateRepositoryStub().update(),
        ok(undefined),
    );
});
