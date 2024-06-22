import { assertEquals } from "@std/assert/assert-equals";
import { dateGeneratorStubBuild, idGeneratorStubBuild } from "./generator.stub.ts";

Deno.test("dateGeneratorStubBuild", () => {
    assertEquals(
        dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")).gen(),
        new Date("2024-06-16T19:16:12.327Z"),
    );
});

Deno.test("idGeneratorStubBuild", () => {
    assertEquals(idGeneratorStubBuild("id").gen(), "id");
    assertEquals(idGeneratorStubBuild("123").gen(), "123");
});
