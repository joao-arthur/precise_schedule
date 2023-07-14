import type { Res } from "../../../infra/res.ts";
import type { BusinessError } from "../../general/business.error.ts";
import type { CreateDateEvent } from "./event.date.create.model.ts";

import { request } from "../../../infra/request.ts";

export function createDateEvent(
    model: CreateDateEvent,
): Promise<Res<void | BusinessError>> {
    return request.post("event/DATE", model);
}
