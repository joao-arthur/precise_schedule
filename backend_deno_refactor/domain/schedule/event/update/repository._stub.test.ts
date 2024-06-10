import { assertEquals } from "@std/assert/assert-equals";
import { EventUpdateRepositoryStub } from "./repository._stub.ts";
import { buildOk } from "../../../lang/result.ts";

Deno.test("EventUpdateRepositoryStub", async () => {
    assertEquals(
        await new EventUpdateRepositoryStub().update(),
        buildOk(undefined),
    );
});
