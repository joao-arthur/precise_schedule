import { assertEquals } from "std/testing/asserts.ts";
import { eventFindModelStub } from "./model._stub.ts";
import { EventFindFactoryStub } from "./factory._stub.ts";

Deno.test("EventFindFactoryStub", () => {
    assertEquals(
        new EventFindFactoryStub(eventFindModelStub).build(),
        eventFindModelStub,
    );
});
