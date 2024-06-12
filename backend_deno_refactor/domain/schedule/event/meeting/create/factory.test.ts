import { assertEquals } from "@std/assert/assert-equals";
import { meetingCreateModelStub } from "./model._stub.ts";
import { buildEventCreate } from "./factory.ts";

Deno.test("buildEventCreate", () => {
    assertEquals(
        buildEventCreate(meetingCreateModelStub),
        {
            category: "MEETING",
            ...meetingCreateModelStub,
        },
    );
});
