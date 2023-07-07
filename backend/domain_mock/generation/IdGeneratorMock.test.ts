import { assertEquals } from "std/testing/asserts.ts";
import { IdGeneratorMock } from "./IdGeneratorMock.ts";

Deno.test("IdGeneratorMock", () => {
    assertEquals(new IdGeneratorMock("id").generate(), "id");
    assertEquals(new IdGeneratorMock("123").generate(), "123");
});
