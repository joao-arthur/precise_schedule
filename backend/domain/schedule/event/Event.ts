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
    | "2_W"
    | "1_M"
    | "2_M"
    | "3_M"
    | "6_M"
    | "1_Y"
    | "2_Y"
    | "5_Y"
    | "10_Y"
    | "NEVER";

type Importance =
    | "LOW"
    | "MEDIUM"
    | "HIGH";

type Status = "active" | "excluded";

type Info = {
    readonly category: Category;
    readonly importance: Importance;
    readonly frequency: Frequency;
    readonly weekendRepeat: boolean;
    readonly status: Status;
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
