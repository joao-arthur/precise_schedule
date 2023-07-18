import { assertEquals } from "std/testing/asserts.ts";
import { dt } from "./dt.ts";
import { DtError } from "./DtError.ts";

Deno.test("dt valid", () => {
    assertEquals(dt(new Date()), undefined);
    assertEquals(dt(new Date("2000-08-22T00:00:00.000Z")), undefined);
});

Deno.test("dt null", () => {
    assertEquals(dt(undefined), new DtError());
    assertEquals(dt(null), new DtError());
});

Deno.test("dt invalid", () => {
    assertEquals(dt(1), new DtError());
    assertEquals(dt(""), new DtError());
    assertEquals(dt([]), new DtError());
    assertEquals(dt(true), new DtError());
});
