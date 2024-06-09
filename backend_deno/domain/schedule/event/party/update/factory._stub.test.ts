import { assertEquals } from "@std/assert/assert-equals";
import { eventUpdateModelStub } from "../../update/model._stub.ts";
import { PartyUpdateFactoryStub } from "./factory._stub.ts";

Deno.test("PartyUpdateFactoryStub", () => {
    assertEquals(
        new PartyUpdateFactoryStub(eventUpdateModelStub).build(),
        eventUpdateModelStub,
    );
});
