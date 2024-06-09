import { assertEquals } from "std/assert/assert_equals.ts";
import { eventUpdateModelStub } from "../../update/model._stub.ts";
import { BirthdayUpdateFactoryStub } from "./factory._stub.ts";

Deno.test("BirthdayUpdateFactoryStub", () => {
    assertEquals(
        new BirthdayUpdateFactoryStub(eventUpdateModelStub).build(),
        eventUpdateModelStub,
    );
});
