import { assertEquals } from "std/testing/asserts.ts";
import { meetingUpdateModelStub } from "./model._stub.ts";
import { MeetingUpdateFactoryImpl } from "./factory.impl.ts";

Deno.test("MeetingUpdateFactoryImpl", () => {
    assertEquals(
        new MeetingUpdateFactoryImpl().build(meetingUpdateModelStub),
        {
            category: "MEETING",
            ...meetingUpdateModelStub,
        },
    );
});
