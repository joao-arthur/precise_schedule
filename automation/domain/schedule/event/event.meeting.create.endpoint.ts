import type { Res } from "../../../infra/res.ts";
import type { BusinessError } from "../../general/business.error.ts";
import type { CreateMeetingEvent } from "./event.meeting.create.model.ts";

import { request } from "../../../infra/request.ts";

export function createMeetingEvent(
    model: CreateMeetingEvent,
): Promise<Res<void | BusinessError>> {
    return request.post("event/MEETING", model);
}
