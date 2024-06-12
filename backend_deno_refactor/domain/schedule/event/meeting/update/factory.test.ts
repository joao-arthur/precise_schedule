import { assertEquals } from "@std/assert/assert-equals";
import { meetingUpdateModelStub } from "./model._stub.ts";
import { buildEventUpdate } from "./factory.ts";

Deno.test("buildEventUpdate", () => {
    assertEquals(
        buildEventUpdate(meetingUpdateModelStub),
        {
            category: "MEETING",
            ...meetingUpdateModelStub,
        },
    );
});
