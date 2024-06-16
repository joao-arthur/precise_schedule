import { assertEquals } from "@std/assert/assert-equals";
import { dateGeneratorStubBuild } from "./date.stub.ts";

Deno.test("dateGeneratorStubBuild", () => {
    assertEquals(
        dateGeneratorStubBuild(new Date()).gen(),
        new Date(),
    );
    assertEquals(
        dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")).gen(),
        new Date("2024-06-16T19:16:12.327Z"),
    );
});
