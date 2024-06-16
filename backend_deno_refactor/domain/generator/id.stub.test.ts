import { assertEquals } from "@std/assert/assert-equals";
import { idGeneratorStubBuild } from "./id.stub.ts";

Deno.test("idGeneratorStubBuild", () => {
    assertEquals(idGeneratorStubBuild("id").gen(), "id");
    assertEquals(idGeneratorStubBuild("123").gen(), "123");
});
