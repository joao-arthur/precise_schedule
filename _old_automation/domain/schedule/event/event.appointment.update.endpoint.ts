import type { Res } from "../../../infra/res.ts";
import type { BusinessError } from "../../general/business.error.ts";
import type { UpdateAppointmentEvent } from "./event.appointment.update.model.ts";

import { request } from "../../../infra/request.ts";
import { ValidationError } from "../../general/validation.error.ts";

export function updateAppointmentEvent(
    id: string,
    model: UpdateAppointmentEvent | undefined | null,
): Promise<Res<void | BusinessError | ValidationError>> {
    return request.put(`event/APPOINTMENT/${id}`, model);
}
