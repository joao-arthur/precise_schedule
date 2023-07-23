import type { Res } from "../../../infra/res.ts";
import type { BusinessError } from "../../general/business.error.ts";
import type { CreateDateEvent } from "./event.date.create.model.ts";

import { request } from "../../../infra/request.ts";
import { ValidationError } from "../../general/validation.error.ts";

export function createDateEvent(
    model: CreateDateEvent | undefined | null,
): Promise<Res<void | BusinessError | ValidationError>> {
    return request.post("event/DATE", model);
}
