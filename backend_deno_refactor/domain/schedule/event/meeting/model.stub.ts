import type { EventCreate } from "../create.ts";
import type { EventUpdate } from "../update.ts";
import type { Event } from "../model.ts";
import type { EventInfo } from "../read.ts";
import type { MeetingCreate } from "./create.ts";
import type { MeetingUpdate } from "./update.ts";

export const meetingCreateStub: MeetingCreate = {
    name: "name",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
    frequency: "1W",
    weekendRepeat: true,
};

export const meetingUpdateStub: MeetingUpdate = {
    name: "name",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
    frequency: "1W",
    weekendRepeat: true,
};

export const meetingEventCreateStub: EventCreate = {
    name: "name",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
    category: "MEETING",
    frequency: "1W",
    weekendRepeat: true,
};

export const meetingEventUpdateStub: EventUpdate = {
    name: "name",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
    category: "MEETING",
    frequency: "1W",
    weekendRepeat: true,
};

export const meetingStub: Event = {
    id: "meeting-id",
    name: "name",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
    category: "MEETING",
    frequency: "1W",
    weekendRepeat: true,
    user: "user-id",
    createdAt: new Date("2024-06-16T19:16:12.327Z"),
    updatedAt: new Date("2024-06-16T19:16:12.327Z"),
};

export const meetingInfoStub: EventInfo = {
    id: "meeting-id",
    name: "name",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
    category: "MEETING",
    frequency: "1W",
    weekendRepeat: true,
};
