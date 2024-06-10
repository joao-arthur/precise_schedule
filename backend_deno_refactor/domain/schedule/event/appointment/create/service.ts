import type { Result } from "../../../../lang/result.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { AppointmentCreateModel } from "./model.ts";

export type AppointmentCreateService = {
    readonly create: (userId: User["id"], event: AppointmentCreateModel) => Promise<Result<Event>>;
};
