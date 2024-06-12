import { assertEquals } from "@std/assert/assert-equals";
import { EventDeleteServiceStub } from "./service._stub.ts";
import { ok } from "../../../lang/result.ts";

Deno.test("EventDeleteServiceStub", async () => {
    assertEquals(
        await new EventDeleteServiceStub().del(),
        ok(undefined),
    );
});
