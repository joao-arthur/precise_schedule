import type { Res } from "../../../infra/res.ts";
import type { Event } from "./event.ts";

import { request } from "../../../infra/request.ts";

export function findEvent(id: string): Promise<Res<Event>> {
    return request.get(`event/${id}`);
}
