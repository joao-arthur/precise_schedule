import type { Result } from "../../../lang/result.ts";
import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventFindRepository } from "./repository.ts";
import type { EventFindModel } from "./model.ts";
import type { EventFindService, FindByUserAndIdErrors, FindByUserErrors } from "./service.ts";
import { err, ok } from "../../../lang/result.ts";
import { buildEventFind } from "./factory.ts";
import { EventNotFound } from "./error.eventNotFound.ts";

export class EventFindServiceImpl implements EventFindService {
    constructor(
        private readonly repository: EventFindRepository,
    ) {}

    public findByUser(
        userId: User["id"],
    ): Promise<Result<readonly Event[], FindByUserErrors>> {
        return this.repository.findByUser(userId);
    }

    public async findByUserMapped(
        userId: User["id"],
    ): Promise<Result<readonly EventFindModel[], FindByUserErrors>> {
        const foundUsersResult = await this.repository.findByUser(userId);
        if (foundUsersResult.type === "err") {
            return foundUsersResult;
        }
        const mapped = foundUsersResult.data.map((event) => buildEventFind(event));
        return ok(mapped);
    }

    public async findByUserAndId(
        userId: User["id"],
        id: Event["id"],
    ): Promise<Result<Event, FindByUserAndIdErrors>> {
        const maybeEventResult = await this.repository.findByUserAndId(userId, id);
        if (maybeEventResult.type === "err") {
            return maybeEventResult;
        }
        if (maybeEventResult.data === undefined) {
            return err(new EventNotFound());
        }
        return ok(maybeEventResult.data);
    }

    public async findByUserAndIdMapped(
        userId: User["id"],
        id: Event["id"],
    ): Promise<Result<EventFindModel, FindByUserAndIdErrors>> {
        const maybeEventResult = await this.repository.findByUserAndId(userId, id);
        if (maybeEventResult.type === "err") {
            return maybeEventResult;
        }
        if (maybeEventResult.data === undefined) {
            return err(new EventNotFound());
        }
        const builtEvent = buildEventFind(maybeEventResult.data);
        return ok(builtEvent);
    }
}