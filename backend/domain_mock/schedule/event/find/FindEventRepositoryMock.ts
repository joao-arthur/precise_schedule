import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { FindEventRepository } from "@ps/domain/schedule/event/find/FindEventRepository.ts";

export class FindEventRepositoryMock implements FindEventRepository {
    constructor(private readonly event: Event | undefined) {}

    public findById(): Event | undefined {
        return this.event;
    }
}
