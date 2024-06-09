import { assertEquals } from "@std/assert/assert-equals";
import { eventUpdateModelStub } from "../../update/model._stub.ts";
import { BirthdayUpdateFactoryStub } from "./factory._stub.ts";

Deno.test("BirthdayUpdateFactoryStub", () => {
    assertEquals(
        new BirthdayUpdateFactoryStub(eventUpdateModelStub).build(),
        eventUpdateModelStub,
    );
});
