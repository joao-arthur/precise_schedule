import type { Result } from "../../../../lang/result.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { MeetingCreateModel } from "./model.ts";

export type MeetingCreateService = {
    readonly create: (userId: User["id"], event: MeetingCreateModel) => Promise<Result<Event>>;
};
