import { assertEquals } from "@std/assert/assert-equals";
import { EventDeleteRepositoryStub } from "./repository._stub.ts";
import { buildOk } from "../../../lang/result.ts";

Deno.test("EventDeleteRepositoryStub", async () => {
    assertEquals(
        await new EventDeleteRepositoryStub().del(),
        buildOk(undefined),
    );
});
