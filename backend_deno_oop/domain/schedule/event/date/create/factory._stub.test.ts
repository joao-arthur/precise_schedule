import { assertEquals } from "@std/assert/assert-equals";
import { createEventModelStub } from "../../create/model._stub.ts";
import { DateCreateFactoryStub } from "./factory._stub.ts";

Deno.test("DateCreateFactoryStub", () => {
    assertEquals(
        new DateCreateFactoryStub(createEventModelStub).build(),
        createEventModelStub,
    );
});
