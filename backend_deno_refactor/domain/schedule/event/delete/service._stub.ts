import type { Result } from "../../../lang/result.ts";
import type { EventDeleteErrors, EventDeleteService } from "./service.ts";
import { ok } from "../../../lang/result.ts";

export class EventDeleteServiceStub implements EventDeleteService {
    public del(): Promise<Result<void, EventDeleteErrors>> {
        return Promise.resolve(ok(undefined));
    }
}
