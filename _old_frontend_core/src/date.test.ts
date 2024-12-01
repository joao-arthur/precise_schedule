import { assert, it } from "vitest";
import {
    current,
    currentMonth,
    currentYear,
    formatDate,
    formatDay,
    formatMonth,
    formatMonths,
    formatWeekDays,
} from "./date.js";

const assertEquals = assert.deepStrictEqual;

it("current", () => {
    assertEquals(current().year, 2024);
    assertEquals(current().month, 11);
});

it("currentMonth", () => {
    assertEquals(currentMonth(), 11);
});
it("currentYear", () => {
    assertEquals(currentYear(), 2024);
});

it("formatDate", () => {
    assertEquals(formatDate("2023-08-23", "pt-BR"), "23/08/2023");
    assertEquals(formatDate("2020-02-29", "pt-BR"), "29/02/2020");
    assertEquals(formatDate("2014-08-08", "pt-BR"), "08/08/2014");
    assertEquals(formatDate("2000-05-09", "pt-BR"), "09/05/2000");
    assertEquals(formatDate("2007-10-03", "pt-BR"), "03/10/2007");
    assertEquals(formatDate("2023-08-23", "en-US"), "8/23/2023");
    assertEquals(formatDate("2020-02-29", "en-US"), "2/29/2020");
    assertEquals(formatDate("2014-08-08", "en-US"), "8/8/2014");
    assertEquals(formatDate("2000-05-09", "en-US"), "5/9/2000");
    assertEquals(formatDate("2007-10-03", "en-US"), "10/3/2007");
    assertEquals(formatDate("2023-08-23", "de-DE"), "23.8.2023");
    assertEquals(formatDate("2020-02-29", "de-DE"), "29.2.2020");
    assertEquals(formatDate("2014-08-08", "de-DE"), "8.8.2014");
    assertEquals(formatDate("2000-05-09", "de-DE"), "9.5.2000");
    assertEquals(formatDate("2007-10-03", "de-DE"), "3.10.2007");
    assertEquals(formatDate("2023-08-23", "es-AR"), "23/8/2023");
    assertEquals(formatDate("2020-02-29", "es-AR"), "29/2/2020");
    assertEquals(formatDate("2014-08-08", "es-AR"), "8/8/2014");
    assertEquals(formatDate("2000-05-09", "es-AR"), "9/5/2000");
    assertEquals(formatDate("2007-10-03", "es-AR"), "3/10/2007");
});

it("formatDay", () => {
    assertEquals(formatDay("2023-08-23"), "23");
    assertEquals(formatDay("2020-02-29"), "29");
    assertEquals(formatDay("2014-08-08"), "08");
    assertEquals(formatDay("2000-05-09"), "09");
});

it("formatMonth", () => {
    assertEquals(formatMonth(1, "pt-BR", "long"), "janeiro");
    assertEquals(formatMonth(2, "en-US", "long"), "february");
    assertEquals(formatMonth(3, "de-DE", "long"), "märz");
    assertEquals(formatMonth(4, "es-AR", "long"), "abril");
    assertEquals(formatMonth(5, "pt-BR", "short"), "mai");
    assertEquals(formatMonth(6, "en-US", "short"), "jun");
    assertEquals(formatMonth(7, "de-DE", "short"), "jul");
    assertEquals(formatMonth(8, "es-AR", "short"), "ago");
    assertEquals(formatMonth(9, "pt-BR", "narrow"), "s");
    assertEquals(formatMonth(10, "en-US", "narrow"), "o");
    assertEquals(formatMonth(11, "de-DE", "narrow"), "n");
    assertEquals(formatMonth(12, "es-AR", "narrow"), "d");
});

it("formatMonths long", () => {
    assertEquals(
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
    assertEquals(
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
    assertEquals(
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
    assertEquals(
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

it("formatMonths short", () => {
    assertEquals(
        formatMonths("pt-BR", "short"),
        ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
    );
    assertEquals(
        formatMonths("en-US", "short"),
        ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
    );
    assertEquals(
        formatMonths("de-DE", "short"),
        ["jan", "feb", "mär", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "dez"],
    );
    assertEquals(
        formatMonths("es-AR", "short"),
        ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"],
    );
});

it("formatMonths narrow", () => {
    assertEquals(
        formatMonths("pt-BR", "narrow"),
        ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
    );
    assertEquals(
        formatMonths("en-US", "narrow"),
        ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
    );
    assertEquals(
        formatMonths("de-DE", "narrow"),
        ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
    );
    assertEquals(
        formatMonths("es-AR", "narrow"),
        ["e", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
    );
});

it("formatWeekDays long", () => {
    assertEquals(
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
    assertEquals(
        formatWeekDays("en-US", "long"),
        ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
    );
    assertEquals(
        formatWeekDays("de-DE", "long"),
        ["sonntag", "montag", "dienstag", "mittwoch", "donnerstag", "freitag", "samstag"],
    );
    assertEquals(
        formatWeekDays("es-AR", "long"),
        ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    );
});

it("formatWeekDays short", () => {
    assertEquals(
        formatWeekDays("pt-BR", "short"),
        ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
    );
    assertEquals(
        formatWeekDays("en-US", "short"),
        ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
    );
    assertEquals(formatWeekDays("de-DE", "short"), ["so", "mo", "di", "mi", "do", "fr", "sa"]);
    assertEquals(
        formatWeekDays("es-AR", "short"),
        ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    );
});

it("formatWeekDays narrow", () => {
    assertEquals(formatWeekDays("pt-BR", "narrow"), ["d", "s", "t", "q", "q", "s", "s"]);
    assertEquals(formatWeekDays("en-US", "narrow"), ["s", "m", "t", "w", "t", "f", "s"]);
    assertEquals(formatWeekDays("de-DE", "narrow"), ["s", "m", "d", "m", "d", "f", "s"]);
    assertEquals(formatWeekDays("es-AR", "narrow"), ["d", "l", "m", "m", "j", "v", "s"]);
});
