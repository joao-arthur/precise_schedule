import type { User } from "@ps/domain/schedule/user/User.ts";
import type { Event } from "../Event.ts";

export type DeleteEventService = {
    readonly del: (userId: User["id"], id: Event["id"]) => Promise<void>;
};
