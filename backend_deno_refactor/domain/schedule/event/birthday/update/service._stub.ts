import type { Result } from "../../../../lang/result.ts";
import type { Event } from "../../model.ts";
import type { BirthdayUpdateErrors, BirthdayUpdateService } from "./service.ts";
import { ok } from "../../../../lang/result.ts";

export class BirthdayUpdateServiceStub implements BirthdayUpdateService {
    constructor(private readonly event: Event) {}

    public update(): Promise<Result<Event, BirthdayUpdateErrors>> {
        return Promise.resolve(ok(this.event));
    }
}
