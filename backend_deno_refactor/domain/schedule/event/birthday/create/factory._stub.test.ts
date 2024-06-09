import { assertEquals } from "@std/assert/assert-equals";
import { createEventModelStub } from "../../create/model._stub.ts";
import { BirthdayCreateFactoryStub } from "./factory._stub.ts";

Deno.test("BirthdayCreateFactoryStub", () => {
    assertEquals(
        new BirthdayCreateFactoryStub(createEventModelStub).build(),
        createEventModelStub,
    );
});
