import type { User } from "../../user/User.ts";
import type { Event } from "../Event.ts";
import type { CreateEventModel } from "./CreateEventModel.ts";

export type CreateEventService = {
    readonly create: (userId: User["id"], event: CreateEventModel) => Promise<Event>;
};
