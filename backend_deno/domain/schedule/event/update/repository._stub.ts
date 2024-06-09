import type { EventUpdateRepository } from "./repository.ts";

export class EventUpdateRepositoryStub implements EventUpdateRepository {
    public async update(): Promise<void> {}
}
