import { assertEquals } from "std/testing/asserts.ts";
import { eventUpdateModelStub } from "../../update/model._stub.ts";
import { DateUpdateFactoryStub } from "./factory._stub.ts";

Deno.test("DateUpdateFactoryStub", () => {
    assertEquals(
        new DateUpdateFactoryStub(
            eventUpdateModelStub,
        ).build(),
        eventUpdateModelStub,
    );
});
