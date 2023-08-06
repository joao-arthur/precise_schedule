import { assert, it } from "vitest";
import { formatMonths } from "./formatMonths.js";

it("formatMonths pt-BR long", () => {
    assert.deepEqual(
        formatMonths("pt-BR", "long"),
        [
            "janeiro",
            "fevereiro",
            "março",
            "abril",
            "maio",
            "junho",
            "julho",
            "agosto",
            "setembro",
            "outubro",
            "novembro",
            "dezembro",
        ],
    );
});

it("formatMonths en-US long", () => {
    assert.deepEqual(
        formatMonths("en-US", "long"),
        [
            "january",
            "february",
            "march",
            "april",
            "may",
            "june",
            "july",
            "august",
            "september",
            "october",
            "november",
            "december",
        ],
    );
});

it("formatMonths de-DE long", () => {
    assert.deepEqual(
        formatMonths("de-DE", "long"),
        [
            "januar",
            "februar",
            "märz",
            "april",
            "mai",
            "juni",
            "juli",
            "august",
            "september",
            "oktober",
            "november",
            "dezember",
        ],
    );
});

it("formatMonths es-AR long", () => {
    assert.deepEqual(
        formatMonths("es-AR", "long"),
        [
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "septiembre",
            "octubre",
            "noviembre",
            "diciembre",
        ],
    );
});

it("formatMonths pt-BR short", () => {
    assert.deepEqual(
        formatMonths("pt-BR", "short"),
        ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
    );
});

it("formatMonths en-US short", () => {
    assert.deepEqual(
        formatMonths("en-US", "short"),
        ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
    );
});

it("formatMonths de-DE short", () => {
    assert.deepEqual(
        formatMonths("de-DE", "short"),
        ["jan", "feb", "mär", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "dez"],
    );
});

it("formatMonths es-AR short", () => {
    assert.deepEqual(
        formatMonths("es-AR", "short"),
        ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"],
    );
});

it("formatMonths pt-BR narrow", () => {
    assert.deepEqual(
        formatMonths("pt-BR", "narrow"),
        ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
    );
});

it("formatMonths en-US narrow", () => {
    assert.deepEqual(
        formatMonths("en-US", "narrow"),
        ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
    );
});

it("formatMonths de-DE narrow", () => {
    assert.deepEqual(
        formatMonths("de-DE", "narrow"),
        ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
    );
});

it("formatMonths es-AR narrow", () => {
    assert.deepEqual(
        formatMonths("es-AR", "narrow"),
        ["e", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
    );
});
