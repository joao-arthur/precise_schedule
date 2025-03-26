import type { Res } from "../../../infra/res.ts";
import type { BusinessError } from "../../general/business.error.ts";

import { request } from "../../../infra/request.ts";
import { ValidationError } from "../../general/validation.error.ts";

export function deleteEvent(id: string): Promise<Res<void | BusinessError | ValidationError>> {
    return request.delete(`event/${id}`);
}
