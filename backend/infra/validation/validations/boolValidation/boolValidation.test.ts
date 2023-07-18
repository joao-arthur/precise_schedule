import { assertEquals } from "std/testing/asserts.ts";
import { bool } from "./bool.ts";
import { BoolError } from "./BoolError.ts";

Deno.test("bool valid", () => {
    assertEquals(bool(true), undefined);
    assertEquals(bool(false), undefined);
});

Deno.test("bool null", () => {
    assertEquals(bool(undefined), new BoolError());
    assertEquals(bool(null), new BoolError());
});

Deno.test("bool invalid", () => {
    assertEquals(bool(1), new BoolError());
    assertEquals(bool(""), new BoolError());
    assertEquals(bool([]), new BoolError());
    assertEquals(bool(new Date()), new BoolError());
});
