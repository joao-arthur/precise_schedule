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
    readonly begin: Date;
    readonly end: Date;
    readonly category: Category;
    readonly frequency: Frequency;
    readonly weekendRepeat: boolean;
};

export type CreateEvent = {
    readonly name: Event["name"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
    readonly category: Event["category"];
    readonly frequency: Event["frequency"];
    readonly weekendRepeat: Event["weekendRepeat"];
};

export type UpdateEvent = {
    readonly name: Event["name"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
    readonly category: Event["category"];
    readonly frequency: Event["frequency"];
    readonly weekendRepeat: Event["weekendRepeat"];
};
