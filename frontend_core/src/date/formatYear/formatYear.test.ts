import { assert, it } from "vitest";
import { formatYear } from "./formatYear.js";

it("formatYear pt-BR long", () => {
    assert.deepEqual(
        formatYear("pt-BR", "long"),
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

it("formatYear en-US long", () => {
    assert.deepEqual(
        formatYear("en-US", "long"),
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

it("formatYear de-DE long", () => {
    assert.deepEqual(
        formatYear("de-DE", "long"),
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

it("formatYear es-AR long", () => {
    assert.deepEqual(
        formatYear("es-AR", "long"),
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

it("formatYear pt-BR short", () => {
    assert.deepEqual(
        formatYear("pt-BR", "short"),
        ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
    );
});

it("formatYear en-US short", () => {
    assert.deepEqual(
        formatYear("en-US", "short"),
        ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
    );
});

it("formatYear de-DE short", () => {
    assert.deepEqual(
        formatYear("de-DE", "short"),
        ["jan", "feb", "mär", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "dez"],
    );
});

it("formatYear es-AR short", () => {
    assert.deepEqual(
        formatYear("es-AR", "short"),
        ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"],
    );
});

it("formatYear pt-BR narrow", () => {
    assert.deepEqual(
        formatYear("pt-BR", "narrow"),
        ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
    );
});

it("formatYear en-US narrow", () => {
    assert.deepEqual(
        formatYear("en-US", "narrow"),
        ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
    );
});

it("formatYear de-DE narrow", () => {
    assert.deepEqual(
        formatYear("de-DE", "narrow"),
        ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
    );
});

it("formatYear es-AR narrow", () => {
    assert.deepEqual(
        formatYear("es-AR", "narrow"),
        ["e", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
    );
});
