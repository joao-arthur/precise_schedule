import type { Result } from "../../../lang/result.ts";
import type { EventDeleteErrors, EventDeleteService } from "./service.ts";
import { buildOk } from "../../../lang/result.ts";

export class EventDeleteServiceStub implements EventDeleteService {
    public del(): Promise<Result<void, EventDeleteErrors>> {
        return Promise.resolve(buildOk(undefined));
    }
}
