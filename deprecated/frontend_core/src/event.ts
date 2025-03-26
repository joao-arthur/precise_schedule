import type { Calendar } from "./calendar.js";
import { nanoid } from "nanoid";
import { repInPeriod } from "lib_repeat_events";
import { toPeriod } from "./calendar.js";

type Category =
    | "APPOINTMENT"
    | "BIRTHDAY"
    | "DATE"
    | "MEETING"
    | "PARTY";

type Frequency =
    | "1D"
    | "2D"
    | "1W"
    | "1M"
    | "3M"
    | "6M"
    | "1Y"
    | "2Y"
    | undefined;

export type Event = {
    readonly id: string;
    readonly name: string;
    readonly day: string;
    readonly begin: string;
    readonly end: string;
    readonly category: Category;
    readonly frequency: Frequency;
    readonly weekendRepeat: boolean;
};

export type EventCalendar = Map<string, readonly string[]>;

export type Appointment = {
    readonly id: Event["id"];
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
    readonly frequency: Event["frequency"];
    readonly weekendRepeat: Event["weekendRepeat"];
};

export type Birthday = {
    readonly id: Event["id"];
    readonly name: Event["name"];
    readonly day: Event["day"];
};

export type Date = {
    readonly id: Event["id"];
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
};

export type Meeting = {
    readonly id: Event["id"];
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
    readonly frequency: Event["frequency"];
    readonly weekendRepeat: Event["weekendRepeat"];
};

export type Party = {
    readonly id: Event["id"];
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
};

export type AppointmentForm = Appointment & {
    readonly repeats: boolean;
};

export type MeetingForm = Meeting & {
    readonly repeats: boolean;
};

export function getOnCalendar(events: readonly Event[], cal: Calendar): EventCalendar {
    const eventsMap = new Map<string, readonly string[]>();
    events.forEach((evt) => {
        const evtReps = repInPeriod({ d: evt.day, freq: evt.frequency }, ...toPeriod(cal));
        evtReps.forEach((dt) => {
            const curr = eventsMap.get(dt);
            eventsMap.set(dt, (curr || []).concat(evt.id));
        });
    });
    return eventsMap;
}

export function appointmentToEvent(event: Appointment): Event {
    return {
        id: event.id || nanoid(32),
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "APPOINTMENT",
        frequency: event.frequency,
        weekendRepeat: event.weekendRepeat,
    };
}

export function birthdayToEvent(event: Birthday): Event {
    return {
        id: event.id || nanoid(32),
        name: event.name,
        day: event.day,
        begin: "00:00",
        end: "23:59",
        category: "BIRTHDAY",
        frequency: "1Y",
        weekendRepeat: false,
    };
}

export function dateToEvent(event: Date): Event {
    return {
        id: event.id || nanoid(32),
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "DATE",
        frequency: undefined,
        weekendRepeat: false,
    };
}

export function meetingToEvent(event: Meeting): Event {
    return {
        id: event.id || nanoid(32),
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "MEETING",
        frequency: event.frequency,
        weekendRepeat: event.weekendRepeat,
    };
}

export function partyToEvent(event: Party): Event {
    return {
        id: event.id || nanoid(32),
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "PARTY",
        frequency: undefined,
        weekendRepeat: false,
    };
}

export function appointmentFromForm(event: AppointmentForm): Appointment {
    return {
        id: event.id,
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        frequency: event.repeats ? event.frequency : undefined,
        weekendRepeat: event.weekendRepeat,
    };
}

export function meetingFromForm(event: MeetingForm): Meeting {
    return {
        id: event.id,
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        frequency: event.repeats ? event.frequency : undefined,
        weekendRepeat: event.weekendRepeat,
    };
}

export function appointmentToForm(event: Partial<Appointment>): Partial<AppointmentForm> {
    return { ...event, repeats: event.frequency !== undefined };
}

export function meetingToForm(event: Partial<Meeting>): Partial<MeetingForm> {
    return { ...event, repeats: event.frequency !== undefined };
}
