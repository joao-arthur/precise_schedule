import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { BirthdayCreateModel } from "./model.ts";

export type BirthdayCreateService = {
    readonly create: (userId: User["id"], event: BirthdayCreateModel) => Promise<Event>;
};
