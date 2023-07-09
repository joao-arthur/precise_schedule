type Category =
    | "APPOINTMENT"
    | "BIRTHDAY"
    | "DATE"
    | "MEETING"
    | "PARTY";

type Frequency =
    | "1_D"
    | "2_D"
    | "1_W"
    | "1_M"
    | "3_M"
    | "6_M"
    | "1_Y"
    | "2_Y"
    | "NEVER";

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

export type BirthdayEvent = {
    readonly name: Event["name"];
    readonly day: Event["day"];
};

export type DateEvent = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
};

export type PartyEvent = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
};

export type AppointmentEvent = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
    readonly frequency: Event["frequency"];
    readonly weekendRepeat: Event["weekendRepeat"];
};

export type MeetingEvent = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
    readonly frequency: Event["frequency"];
    readonly weekendRepeat: Event["weekendRepeat"];
};
