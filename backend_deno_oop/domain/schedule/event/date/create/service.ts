import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { DateCreateModel } from "./model.ts";

export type DateCreateService = {
    readonly create: (userId: User["id"], event: DateCreateModel) => Promise<Event>;
};
