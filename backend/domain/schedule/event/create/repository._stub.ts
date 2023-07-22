import type { EventCreateRepository } from "./repository.ts";

export class EventCreateRepositoryStub implements EventCreateRepository {
    public async create(): Promise<void> {}
}
