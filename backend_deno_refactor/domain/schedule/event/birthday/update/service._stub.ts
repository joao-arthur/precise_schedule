import type { Result } from "../../../../lang/result.ts";
import type { Event } from "../../model.ts";
import type { BirthdayUpdateService } from "./service.ts";
import { buildOk } from "../../../../lang/result.ts";

export class BirthdayUpdateServiceStub implements BirthdayUpdateService {
    constructor(private readonly event: Event) {}

    public update(): Promise<Result<Event>> {
        return Promise.resolve(buildOk(this.event));
    }
}
