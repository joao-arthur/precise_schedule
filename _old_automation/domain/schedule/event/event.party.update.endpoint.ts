import type { Res } from "../../../infra/res.ts";
import type { BusinessError } from "../../general/business.error.ts";
import type { UpdatePartyEvent } from "./event.party.update.model.ts";

import { request } from "../../../infra/request.ts";
import { ValidationError } from "../../general/validation.error.ts";

export function updatePartyEvent(
    id: string,
    model: UpdatePartyEvent | undefined | null,
): Promise<Res<void | BusinessError | ValidationError>> {
    return request.put(`event/PARTY/${id}`, model);
}
