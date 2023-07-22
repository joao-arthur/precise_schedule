import { assertEquals } from "std/testing/asserts.ts";
import { createEventModelStub } from "../../create/model._stub.ts";
import { MeetingCreateFactoryStub } from "./factory._stub.ts";

Deno.test("MeetingCreateFactoryStub", () => {
    assertEquals(
        new MeetingCreateFactoryStub(
            createEventModelStub,
        ).build(),
        createEventModelStub,
    );
});
