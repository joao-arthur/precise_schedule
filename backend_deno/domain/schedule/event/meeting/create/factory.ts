import type { EventCreateModel } from "../../create/model.ts";
import type { MeetingCreateModel } from "./model.ts";

export type MeetingCreateFactory = {
    readonly build: (event: MeetingCreateModel) => EventCreateModel;
};
