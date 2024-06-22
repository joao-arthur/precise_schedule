import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { MeetingUpdateModel } from "./model.ts";

export type MeetingUpdateService = {
    readonly update: (
        userId: User["id"],
        id: Event["id"],
        event: MeetingUpdateModel,
    ) => Promise<Event>;
};
