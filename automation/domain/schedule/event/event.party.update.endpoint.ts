import type { Res } from "../../../infra/res.ts";
import type { BusinessError } from "../../general/business.error.ts";
import type { UpdatePartyEvent } from "./event.party.update.model.ts";

import { request } from "../../../infra/request.ts";

export function updatePartyEvent(
    id: string,
    model: UpdatePartyEvent,
): Promise<Res<void | BusinessError>> {
    return request.put(`event/PARTY/${id}`, model);
}
