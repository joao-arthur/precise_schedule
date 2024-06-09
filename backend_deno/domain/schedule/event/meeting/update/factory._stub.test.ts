import { assertEquals } from "std/assert/assert_equals.ts";
import { eventUpdateModelStub } from "../../update/model._stub.ts";
import { MeetingUpdateFactoryStub } from "./factory._stub.ts";

Deno.test("MeetingUpdateFactoryStub", () => {
    assertEquals(
        new MeetingUpdateFactoryStub(eventUpdateModelStub).build(),
        eventUpdateModelStub,
    );
});
