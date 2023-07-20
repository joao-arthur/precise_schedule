import type { User } from "../../user/User.ts";
import type { Event } from "../Event.ts";
import type { CreateEventModel } from "./CreateEventModel.ts";

export type CreateEventFactory = {
    readonly build: (userId: User["id"], event: CreateEventModel) => Event;
};
