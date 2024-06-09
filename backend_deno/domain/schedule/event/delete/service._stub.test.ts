import { assertEquals } from "std/testing/asserts.ts";
import { EventDeleteServiceStub } from "./service._stub.ts";

Deno.test("EventDeleteServiceStub", async () => {
    assertEquals(await new EventDeleteServiceStub().del(), undefined);
});
