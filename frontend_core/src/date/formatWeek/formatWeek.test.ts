import { assert, it } from "vitest";
import { formatWeek } from "./formatWeek.js";

it("formatWeek pt-BR long", () => {
    assert.deepEqual(
        formatWeek("pt-BR", "long"),
        [
            "domingo",
            "segunda-feira",
            "terça-feira",
            "quarta-feira",
            "quinta-feira",
            "sexta-feira",
            "sábado",
        ],
    );
});

it("formatWeek en-US long", () => {
    assert.deepEqual(
        formatWeek("en-US", "long"),
        ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
    );
});

it("formatWeek de-DE long", () => {
    assert.deepEqual(
        formatWeek("de-DE", "long"),
        ["sonntag", "montag", "dienstag", "mittwoch", "donnerstag", "freitag", "samstag"],
    );
});

it("formatWeek es-AR long", () => {
    assert.deepEqual(
        formatWeek("es-AR", "long"),
        ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    );
});

it("formatWeek pt-BR short", () => {
    assert.deepEqual(
        formatWeek("pt-BR", "short"),
        ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
    );
});

it("formatWeek en-US short", () => {
    assert.deepEqual(
        formatWeek("en-US", "short"),
        ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
    );
});

it("formatWeek de-DE short", () => {
    assert.deepEqual(
        formatWeek("de-DE", "short"),
        ["so", "mo", "di", "mi", "do", "fr", "sa"],
    );
});

it("formatWeek es-AR short", () => {
    assert.deepEqual(
        formatWeek("es-AR", "short"),
        ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    );
});

it("formatWeek pt-BR narrow", () => {
    assert.deepEqual(
        formatWeek("pt-BR", "narrow"),
        ["d", "s", "t", "q", "q", "s", "s"],
    );
});

it("formatWeek en-US narrow", () => {
    assert.deepEqual(
        formatWeek("en-US", "narrow"),
        ["s", "m", "t", "w", "t", "f", "s"],
    );
});

it("formatWeek de-DE narrow", () => {
    assert.deepEqual(
        formatWeek("de-DE", "narrow"),
        ["s", "m", "d", "m", "d", "f", "s"],
    );
});

it("formatWeek es-AR narrow", () => {
    assert.deepEqual(
        formatWeek("es-AR", "narrow"),
        ["d", "l", "m", "m", "j", "v", "s"],
    );
});
