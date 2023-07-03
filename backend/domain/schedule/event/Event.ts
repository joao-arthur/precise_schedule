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

type Info = {
    readonly category: Category;
    readonly frequency: Frequency;
    readonly weekendRepeat: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
};

type Notification = {
    readonly browserNotification: boolean;
    readonly emailNotification: boolean;
};

export type Event = {
    readonly id: string;
    readonly name: string;
    readonly begin: Date;
    readonly end: Date;
};
