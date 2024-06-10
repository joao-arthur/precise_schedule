import { assertEquals } from "@std/assert/assert-equals";
import { EventDeleteServiceStub } from "./service._stub.ts";
import { buildOk } from "../../../lang/result.ts";

Deno.test("EventDeleteServiceStub", async () => {
    assertEquals(
        await new EventDeleteServiceStub().del(),
        buildOk(undefined),
    );
});
