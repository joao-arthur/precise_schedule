import { assertEquals } from "@std/assert/assert-equals";
import { IdGeneratorStub } from "./service._stub.ts";

Deno.test("IdGeneratorStub", () => {
    assertEquals(new IdGeneratorStub("id").generate(), "id");
    assertEquals(new IdGeneratorStub("123").generate(), "123");
});
