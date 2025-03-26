import { assert, it } from "vitest";
import { map } from "funis";
import {
    appointmentFromForm,
    appointmentToEvent,
    appointmentToForm,
    birthdayToEvent,
    dateToEvent,
    getOnCalendar,
    meetingFromForm,
    meetingToEvent,
    meetingToForm,
    partyToEvent,
} from "./event.js";

it("getOnCalendar", () => {
    const res = getOnCalendar([], { year: 2023, month: 8 });
    assert.deepEqual(map.entries(res), []);
});

it("getOnCalendar", () => {
    const res = getOnCalendar(
        [
            {
                id: "tequila",
                name: "daram daramram ram ramram",
                begin: "08:00",
                end: "18:00",
                category: "APPOINTMENT",
                weekendRepeat: true,
                day: "2023-07-31",
                frequency: "1W",
            },
            {
                id: "vodka",
                name: "ou água de coco",
                begin: "08:00",
                end: "18:00",
                category: "APPOINTMENT",
                weekendRepeat: true,
                day: "2023-07-14",
                frequency: "1M",
            },
        ],
        { year: 2023, month: 8 },
    );
    assert.deepEqual(
        map.entries(res),
        [
            ["2023-08-07", ["tequila"]],
            ["2023-08-14", ["tequila", "vodka"]],
            ["2023-08-21", ["tequila"]],
            ["2023-08-28", ["tequila"]],
        ],
    );
});

it("appointmentToEvent", () => {
    assert.deepEqual(
        appointmentToEvent({
            id: "abcdefg",
            name: "Final date",
            day: "2018-12-10",
            begin: "09:00",
            end: "17:00",
            frequency: "1D",
            weekendRepeat: false,
        }),
        {
            id: "abcdefg",
            name: "Final date",
            day: "2018-12-10",
            begin: "09:00",
            end: "17:00",
            category: "APPOINTMENT",
            frequency: "1D",
            weekendRepeat: false,
        },
    );
});

it("birthdayToEvent", () => {
    assert.deepEqual(
        birthdayToEvent({
            id: "abcdefg",
            name: "My birthday",
            day: "2000-08-22",
        }),
        {
            id: "abcdefg",
            name: "My birthday",
            day: "2000-08-22",
            begin: "00:00",
            end: "23:59",
            category: "BIRTHDAY",
            frequency: "1Y",
            weekendRepeat: false,
        },
    );
});

it("dateToEvent", () => {
    assert.deepEqual(
        dateToEvent({
            id: "abcdefg",
            name: "Final date",
            day: "2018-12-10",
            begin: "09:00",
            end: "17:00",
        }),
        {
            id: "abcdefg",
            name: "Final date",
            day: "2018-12-10",
            begin: "09:00",
            end: "17:00",
            category: "DATE",
            frequency: undefined,
            weekendRepeat: false,
        },
    );
});

it("meetingToEvent", () => {
    assert.deepEqual(
        meetingToEvent({
            id: "abcdefg",
            name: "Final date",
            day: "2018-12-10",
            begin: "09:00",
            end: "17:00",
            frequency: "1D",
            weekendRepeat: false,
        }),
        {
            id: "abcdefg",
            name: "Final date",
            day: "2018-12-10",
            begin: "09:00",
            end: "17:00",
            category: "MEETING",
            frequency: "1D",
            weekendRepeat: false,
        },
    );
});

it("partyToEvent", () => {
    assert.deepEqual(
        partyToEvent({
            id: "abcdefg",
            name: "New Year Party",
            day: "2019-12-31",
            begin: "09:00",
            end: "17:00",
        }),
        {
            id: "abcdefg",
            name: "New Year Party",
            day: "2019-12-31",
            begin: "09:00",
            end: "17:00",
            category: "PARTY",
            frequency: undefined,
            weekendRepeat: false,
        },
    );
});

it("appointmentToForm", () => {
    assert.deepEqual(
        appointmentToForm({ day: "2023-08-10" }),
        { day: "2023-08-10", repeats: false },
    );
    assert.deepEqual(appointmentToForm({ frequency: "1D" }), { frequency: "1D", repeats: true });
});

it("meetingToForm", () => {
    assert.deepEqual(meetingToForm({ day: "2023-08-10" }), { day: "2023-08-10", repeats: false });
    assert.deepEqual(meetingToForm({ frequency: "1D" }), { frequency: "1D", repeats: true });
});
