import { assertEquals } from "std/assert/assert_equals.ts";
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
