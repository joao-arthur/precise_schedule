import type { UpdateUserRepository } from "@ps/domain/schedule/user/update/UpdateUserRepository.ts";

export class UpdateUserRepositoryMock implements UpdateUserRepository {
    public async update(): Promise<void> {}
}
