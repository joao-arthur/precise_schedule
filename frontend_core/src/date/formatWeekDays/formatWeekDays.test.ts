import { assert, it } from "vitest";
import { formatWeekDays } from "./formatWeekDays.js";

it("formatWeekDays pt-BR long", () => {
    assert.deepEqual(
        formatWeekDays("pt-BR", "long"),
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

it("formatWeekDays en-US long", () => {
    assert.deepEqual(
        formatWeekDays("en-US", "long"),
        ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
    );
});

it("formatWeekDays de-DE long", () => {
    assert.deepEqual(
        formatWeekDays("de-DE", "long"),
        ["sonntag", "montag", "dienstag", "mittwoch", "donnerstag", "freitag", "samstag"],
    );
});

it("formatWeekDays es-AR long", () => {
    assert.deepEqual(
        formatWeekDays("es-AR", "long"),
        ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    );
});

it("formatWeekDays pt-BR short", () => {
    assert.deepEqual(
        formatWeekDays("pt-BR", "short"),
        ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
    );
});

it("formatWeekDays en-US short", () => {
    assert.deepEqual(
        formatWeekDays("en-US", "short"),
        ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
    );
});

it("formatWeekDays de-DE short", () => {
    assert.deepEqual(
        formatWeekDays("de-DE", "short"),
        ["so", "mo", "di", "mi", "do", "fr", "sa"],
    );
});

it("formatWeekDays es-AR short", () => {
    assert.deepEqual(
        formatWeekDays("es-AR", "short"),
        ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    );
});

it("formatWeekDays pt-BR narrow", () => {
    assert.deepEqual(
        formatWeekDays("pt-BR", "narrow"),
        ["d", "s", "t", "q", "q", "s", "s"],
    );
});

it("formatWeekDays en-US narrow", () => {
    assert.deepEqual(
        formatWeekDays("en-US", "narrow"),
        ["s", "m", "t", "w", "t", "f", "s"],
    );
});

it("formatWeekDays de-DE narrow", () => {
    assert.deepEqual(
        formatWeekDays("de-DE", "narrow"),
        ["s", "m", "d", "m", "d", "f", "s"],
    );
});

it("formatWeekDays es-AR narrow", () => {
    assert.deepEqual(
        formatWeekDays("es-AR", "narrow"),
        ["d", "l", "m", "m", "j", "v", "s"],
    );
});
