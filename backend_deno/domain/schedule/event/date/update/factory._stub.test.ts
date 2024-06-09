import { assertEquals } from "std/assert/assert_equals.ts";
import { eventUpdateModelStub } from "../../update/model._stub.ts";
import { DateUpdateFactoryStub } from "./factory._stub.ts";

Deno.test("DateUpdateFactoryStub", () => {
    assertEquals(
        new DateUpdateFactoryStub(eventUpdateModelStub).build(),
        eventUpdateModelStub,
    );
});
