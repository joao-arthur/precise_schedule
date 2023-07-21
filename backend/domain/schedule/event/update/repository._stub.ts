import type { UpdateEventRepository } from "@ps/domain/schedule/event/update/UpdateEventRepository.ts";

export class UpdateEventRepositoryMock implements UpdateEventRepository {
    public async update(): Promise<void> {}
}
