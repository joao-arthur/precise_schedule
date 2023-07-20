import type { Res } from "../../../infra/res.ts";
import type { Event } from "./event.ts";

import { request } from "../../../infra/request.ts";

export function findAllEvent(): Promise<Res<readonly Event[]>> {
    return request.get("event");
}
