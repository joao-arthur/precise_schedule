import { assert, it } from "vitest";
import { formatDate } from "./formatDate.js";

it("formatDate pt-BR", () => {
    assert.strictEqual(formatDate("2023-08-23", "pt-BR"), "23/08/2023");
    assert.strictEqual(formatDate("2020-02-29", "pt-BR"), "29/02/2020");
    assert.strictEqual(formatDate("2014-08-08", "pt-BR"), "08/08/2014");
    assert.strictEqual(formatDate("2000-05-09", "pt-BR"), "09/05/2000");
    assert.strictEqual(formatDate("2007-10-03", "pt-BR"), "03/10/2007");
});

it("formatDate en-US", () => {
    assert.strictEqual(formatDate("2023-08-23", "en-US"), "8/23/2023");
    assert.strictEqual(formatDate("2020-02-29", "en-US"), "2/29/2020");
    assert.strictEqual(formatDate("2014-08-08", "en-US"), "8/8/2014");
    assert.strictEqual(formatDate("2000-05-09", "en-US"), "5/9/2000");
    assert.strictEqual(formatDate("2007-10-03", "en-US"), "10/3/2007");
});

it("formatDate de-DE", () => {
    assert.strictEqual(formatDate("2023-08-23", "de-DE"), "23.8.2023");
    assert.strictEqual(formatDate("2020-02-29", "de-DE"), "29.2.2020");
    assert.strictEqual(formatDate("2014-08-08", "de-DE"), "8.8.2014");
    assert.strictEqual(formatDate("2000-05-09", "de-DE"), "9.5.2000");
    assert.strictEqual(formatDate("2007-10-03", "de-DE"), "3.10.2007");
});

it("formatDate es-AR", () => {
    assert.strictEqual(formatDate("2023-08-23", "es-AR"), "23/8/2023");
    assert.strictEqual(formatDate("2020-02-29", "es-AR"), "29/2/2020");
    assert.strictEqual(formatDate("2014-08-08", "es-AR"), "8/8/2014");
    assert.strictEqual(formatDate("2000-05-09", "es-AR"), "9/5/2000");
    assert.strictEqual(formatDate("2007-10-03", "es-AR"), "3/10/2007");
});
