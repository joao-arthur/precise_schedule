import { assertEquals } from "std/assert/assert_equals.ts";
import { EventDeleteServiceStub } from "./service._stub.ts";

Deno.test("EventDeleteServiceStub", async () => {
    assertEquals(await new EventDeleteServiceStub().del(), undefined);
});
