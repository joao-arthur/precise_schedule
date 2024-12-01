import type { Res } from "../../../infra/res.ts";
import type { BusinessError } from "../../general/business.error.ts";
import type { CreatePartyEvent } from "./event.party.create.model.ts";

import { request } from "../../../infra/request.ts";
import { ValidationError } from "../../general/validation.error.ts";

export function createPartyEvent(
    model: CreatePartyEvent | undefined | null,
): Promise<Res<void | BusinessError | ValidationError>> {
    return request.post("event/PARTY", model);
}
