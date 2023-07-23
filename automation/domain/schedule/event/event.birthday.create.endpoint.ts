import type { Res } from "../../../infra/res.ts";
import type { BusinessError } from "../../general/business.error.ts";
import type { CreateBirthdayEvent } from "./event.birthday.create.model.ts";

import { request } from "../../../infra/request.ts";
import { ValidationError } from "../../general/validation.error.ts";

export function createBirthdayEvent(
    model: CreateBirthdayEvent | undefined | null,
): Promise<Res<void | BusinessError | ValidationError>> {
    return request.post("event/BIRTHDAY", model);
}
