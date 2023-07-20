import { assertEquals } from "std/testing/asserts.ts";
import { DeleteEventServiceMock } from "./DeleteEventServiceMock.ts";

Deno.test("DeleteEventServiceMock", async () => {
    assertEquals(await new DeleteEventServiceMock().del(), undefined);
});
