import type { CreateEventRepository } from "@ps/domain/schedule/event/create/CreateEventRepository.ts";

export class CreateEventRepositoryMock
    implements CreateEventRepository {
    public async create(): Promise<void> {}
}
