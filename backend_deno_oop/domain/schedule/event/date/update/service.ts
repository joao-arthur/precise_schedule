import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { DateUpdateModel } from "./model.ts";

export type DateUpdateService = {
    readonly update: (
        userId: User["id"],
        id: Event["id"],
        event: DateUpdateModel,
    ) => Promise<Event>;
};
