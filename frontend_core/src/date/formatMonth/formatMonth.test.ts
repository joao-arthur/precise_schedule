import { assert, it } from "vitest";
import { formatMonth } from "./formatMonth.js";

it("formatMonth", () => {
    assert.deepEqual(formatMonth(1, "pt-BR", "long"), "janeiro");
    assert.deepEqual(formatMonth(2, "en-US", "long"), "february");
    assert.deepEqual(formatMonth(3, "de-DE", "long"), "märz");
    assert.deepEqual(formatMonth(4, "es-AR", "long"), "abril");
    assert.deepEqual(formatMonth(5, "pt-BR", "short"), "mai");
    assert.deepEqual(formatMonth(6, "en-US", "short"), "jun");
    assert.deepEqual(formatMonth(7, "de-DE", "short"), "jul");
    assert.deepEqual(formatMonth(8, "es-AR", "short"), "ago");
    assert.deepEqual(formatMonth(9, "pt-BR", "narrow"), "s");
    assert.deepEqual(formatMonth(10, "en-US", "narrow"), "o");
    assert.deepEqual(formatMonth(11, "de-DE", "narrow"), "n");
    assert.deepEqual(formatMonth(12, "es-AR", "narrow"), "d");
});
