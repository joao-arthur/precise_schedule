import type { Result } from "../../../lang/result.ts";
import type { EventDeleteService } from "./service.ts";
import { buildOk } from "../../../lang/result.ts";

export class EventDeleteServiceStub implements EventDeleteService {
    public del(): Promise<Result<void>> {
        return Promise.resolve(buildOk(undefined));
    }
}
