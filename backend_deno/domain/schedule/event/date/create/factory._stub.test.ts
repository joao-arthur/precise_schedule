import { assertEquals } from "std/testing/asserts.ts";
import { createEventModelStub } from "../../create/model._stub.ts";
import { DateCreateFactoryStub } from "./factory._stub.ts";

Deno.test("DateCreateFactoryStub", () => {
    assertEquals(
        new DateCreateFactoryStub(createEventModelStub).build(),
        createEventModelStub,
    );
});
