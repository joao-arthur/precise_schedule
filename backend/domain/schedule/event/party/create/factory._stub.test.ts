import { assertEquals } from "std/testing/asserts.ts";
import { createEventModelStub } from "../../create/model._stub.ts";
import { PartyCreateFactoryStub } from "./factory._stub.ts";

Deno.test("PartyCreateFactoryStub", () => {
    assertEquals(
        new PartyCreateFactoryStub(createEventModelStub).build(),
        createEventModelStub,
    );
});
