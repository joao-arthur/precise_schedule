import type { Res } from "../../../infra/res.ts";
import type { BusinessError } from "../../general/business.error.ts";
import type { CreatePartyEvent } from "./event.party.create.model.ts";

import { request } from "../../../infra/request.ts";

export function createPartyEvent(
    model: CreatePartyEvent,
): Promise<Res<void | BusinessError>> {
    return request.post("event/PARTY", model);
}
