import type { Res } from "../../../infra/res.ts";
import type { BusinessError } from "../../general/business.error.ts";
import type { UpdateMeetingEvent } from "./event.meeting.update.model.ts";

import { request } from "../../../infra/request.ts";
import { ValidationError } from "../../general/validation.error.ts";

export function updateMeetingEvent(
    id: string,
    model: UpdateMeetingEvent | undefined | null,
): Promise<Res<void | BusinessError | ValidationError>> {
    return request.put(`event/MEETING/${id}`, model);
}
