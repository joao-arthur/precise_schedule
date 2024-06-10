import type { Result } from "../../../lang/result.ts";
import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventFindService } from "./service.ts";
import type { EventFindFactory } from "./factory.ts";
import type { EventFindRepository } from "./repository.ts";
import type { EventFindModel } from "./model.ts";
import { buildErr, buildOk } from "../../../lang/result.ts";
import { EventNotFound } from "./error.eventNotFound.ts";

export class EventFindServiceImpl implements EventFindService {
    constructor(
        private readonly factory: EventFindFactory,
        private readonly repository: EventFindRepository,
    ) {}

    public findByUser(userId: User["id"]): Promise<Result<readonly Event[]>> {
        return this.repository.findByUser(userId);
    }

    public async findByUserMapped(
        userId: User["id"],
    ): Promise<Result<readonly EventFindModel[]>> {
        const foundUsers = await this.repository.findByUser(userId);
        if (foundUsers.type === "err") {
            return foundUsers;
        }
        const mapped = foundUsers.data.map((event) => this.factory.build(event));
        return buildOk(mapped);
    }

    public async findByUserAndId(
        userId: User["id"],
        id: Event["id"],
    ): Promise<Result<Event, EventNotFound>> {
        const maybeEvent = await this.repository.findByUserAndId(userId, id);
        if (maybeEvent.type === "err") {
            return maybeEvent;
        }
        if (maybeEvent.data === undefined) {
            return buildErr(new EventNotFound());
        }
        return buildOk(maybeEvent.data);
    }

    public async findByUserAndIdMapped(
        userId: User["id"],
        id: Event["id"],
    ): Promise<Result<EventFindModel, EventNotFound>> {
        const maybeEvent = await this.repository.findByUserAndId(userId, id);
        if (maybeEvent.type === "err") {
            return maybeEvent;
        }
        if (maybeEvent.data === undefined) {
            return buildErr(new EventNotFound());
        }
        return buildOk(this.factory.build(maybeEvent.data));
    }
}
