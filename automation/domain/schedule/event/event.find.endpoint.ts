import type { Res } from "../../../infra/res.ts";
import type { EventFindModel } from "./event.find.model.ts";

import { request } from "../../../infra/request.ts";

export function findEvent(id: string): Promise<Res<EventFindModel>> {
    return request.get(`event/${id}`);
}
