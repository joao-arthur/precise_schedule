import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateEventRepository } from "@ps/domain/schedule/event/update/UpdateEventRepository.ts";
import type { UpdateEventFactory } from "@ps/domain/schedule/event/update/UpdateEventFactory.ts";
import type { UpdateEventService } from "@ps/domain/schedule/event/update/UpdateEventService.ts";
import type { UpdateEventModel } from "@ps/domain/schedule/event/update/UpdateEventModel.ts";
import type { FindEventService } from "@ps/domain/schedule/event/find/FindEventService.ts";

export class UpdateEventServiceImpl implements UpdateEventService {
    constructor(
        private readonly repository: UpdateEventRepository,
        private readonly factory: UpdateEventFactory,
        //private readonly validator: Validator,
        private readonly findEventService: FindEventService,
    ) {}

    public async update(
        id: Event["id"],
        event: UpdateEventModel,
    ): Promise<Event> {
        // this.validator.validate(event, updateEventValidation);
        const existingEvent = await this.findEventService.findById(id);
        const buildedEvent = this.factory.build(event, existingEvent);
        await this.repository.update(buildedEvent);
        return buildedEvent;
    }
}
