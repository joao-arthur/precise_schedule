import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { BirthdayUpdateModel } from "./model.ts";

export type BirthdayUpdateService = {
    readonly update: (
        userId: User["id"],
        id: Event["id"],
        event: BirthdayUpdateModel,
    ) => Promise<Event>;
};
