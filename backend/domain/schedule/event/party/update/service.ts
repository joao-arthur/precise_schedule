import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { PartyUpdateModel } from "./model.ts";

export type PartyUpdateService = {
    readonly update: (
        userId: User["id"],
        id: Event["id"],
        event: PartyUpdateModel,
    ) => Promise<Event>;
};
