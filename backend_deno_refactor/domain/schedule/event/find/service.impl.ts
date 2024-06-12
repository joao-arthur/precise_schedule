import type { Result } from "../../../lang/result.ts";
import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventFindFactory } from "./factory.ts";
import type { EventFindRepository } from "./repository.ts";
import type { EventFindModel } from "./model.ts";
import type { EventFindService, FindByUserAndIdErrors, FindByUserErrors } from "./service.ts";
import { buildErr, buildOk } from "../../../lang/result.ts";
import { EventNotFound } from "./error.eventNotFound.ts";

export class EventFindServiceImpl implements EventFindService {
    constructor(
        private readonly factory: EventFindFactory,
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
        const mapped = foundUsersResult.data.map((event) => this.factory.build(event));
        return buildOk(mapped);
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
            return buildErr(new EventNotFound());
        }
        return buildOk(maybeEventResult.data);
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
            return buildErr(new EventNotFound());
        }
        return buildOk(this.factory.build(maybeEventResult.data));
    }
}
