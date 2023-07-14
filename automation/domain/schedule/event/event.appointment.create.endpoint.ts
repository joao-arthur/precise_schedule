import type { Res } from "../../../infra/res.ts";
import type { BusinessError } from "../../general/business.error.ts";
import type { CreateAppointmentEvent } from "./event.appointment.create.model.ts";

import { request } from "../../../infra/request.ts";

export function createAppointmentEvent(
    model: CreateAppointmentEvent,
): Promise<Res<void | BusinessError>> {
    return request.post("event/APPOINTMENT", model);
}
