import { assertEquals } from "@std/assert/assert-equals";
import { idGeneratorStubBuild } from "./id.stub.ts";

Deno.test("idGeneratorStubBuild", () => {
    assertEquals(idGeneratorStubBuild("id").generate(), "id");
    assertEquals(idGeneratorStubBuild("123").generate(), "123");
});
