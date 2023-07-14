import type { Res } from "../../../infra/res.ts";
import type { BusinessError } from "../../general/business.error.ts";
import type { CreateBirthdayEvent } from "./event.birthday.create.model.ts";

import { request } from "../../../infra/request.ts";

export function createBirthdayEvent(
    model: CreateBirthdayEvent,
): Promise<Res<void | BusinessError>> {
    return request.post("event/BIRTHDAY", model);
}
