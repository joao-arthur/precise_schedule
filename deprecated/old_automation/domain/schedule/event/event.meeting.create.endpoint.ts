import type { Res } from "../../../infra/res.ts";
import type { BusinessError } from "../../general/business.error.ts";
import type { CreateMeetingEvent } from "./event.meeting.create.model.ts";

import { request } from "../../../infra/request.ts";
import { ValidationError } from "../../general/validation.error.ts";

export function createMeetingEvent(
    model: CreateMeetingEvent | undefined | null,
): Promise<Res<void | BusinessError | ValidationError>> {
    return request.post("event/MEETING", model);
}
