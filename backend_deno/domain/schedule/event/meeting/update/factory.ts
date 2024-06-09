import type { EventUpdateModel } from "../../update/model.ts";
import type { MeetingUpdateModel } from "./model.ts";

export type MeetingUpdateFactory = {
    readonly build: (event: MeetingUpdateModel) => EventUpdateModel;
};
