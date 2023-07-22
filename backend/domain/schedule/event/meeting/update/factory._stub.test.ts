import { assertEquals } from "std/testing/asserts.ts";
import { eventUpdateModelStub } from "../../update/model._stub.ts";
import { MeetingUpdateFactoryStub } from "./factory._stub.ts";

Deno.test("MeetingUpdateFactoryStub", () => {
    assertEquals(
        new MeetingUpdateFactoryStub(eventUpdateModelStub).build(),
        eventUpdateModelStub,
    );
});
