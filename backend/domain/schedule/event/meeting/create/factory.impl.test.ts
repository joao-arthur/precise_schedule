import { assertEquals } from "std/testing/asserts.ts";
import { meetingCreateModelStub } from "./model._stub.ts";
import { MeetingCreateFactoryImpl } from "./factory.impl.ts";

Deno.test("MeetingCreateFactoryImpl", () => {
    assertEquals(
        new MeetingCreateFactoryImpl().build(meetingCreateModelStub),
        {
            category: "MEETING",
            ...meetingCreateModelStub,
        },
    );
});
