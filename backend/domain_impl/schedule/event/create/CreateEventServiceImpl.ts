import type { User } from "@ps/domain/schedule/user/User.ts";
import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateEventRepository } from "@ps/domain/schedule/event/create/CreateEventRepository.ts";
import type { CreateEventFactory } from "@ps/domain/schedule/event/create/CreateEventFactory.ts";
import type { CreateEventService } from "@ps/domain/schedule/event/create/CreateEventService.ts";
import type { CreateEventModel } from "@ps/domain/schedule/event/create/CreateEventModel.ts";

export class CreateEventServiceImpl implements CreateEventService {
    constructor(
        private readonly repository: CreateEventRepository,
        private readonly factory: CreateEventFactory,
    ) {}

    public async create(userId: User["id"], event: CreateEventModel): Promise<Event> {
        const buildedEvent = this.factory.build(userId, event);
        await this.repository.create(buildedEvent);
        return buildedEvent;
    }
}
