import type { Res } from "../../../infra/res.ts";
import type { EventFindModel } from "./event.find.model.ts";

import { request } from "../../../infra/request.ts";

export function findAllEvent(): Promise<Res<readonly EventFindModel[]>> {
    return request.get("event");
}
