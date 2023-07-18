import type { Res } from "../../../infra/res.ts";
import type { BusinessError } from "../../general/business.error.ts";
import type { UpdateDateEvent } from "./event.date.update.model.ts";

import { request } from "../../../infra/request.ts";
import { ValidationError } from "../../general/validation.error.ts";

export function updateDateEvent(
    id: string,
    model: UpdateDateEvent,
): Promise<Res<void | BusinessError | ValidationError>> {
    return request.put(`event/DATE/${id}`, model);
}
