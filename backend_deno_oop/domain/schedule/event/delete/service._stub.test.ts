import { assertEquals } from "@std/assert/assert-equals";
import { EventDeleteServiceStub } from "./service._stub.ts";

Deno.test("EventDeleteServiceStub", async () => {
    assertEquals(await new EventDeleteServiceStub().del(), undefined);
});
