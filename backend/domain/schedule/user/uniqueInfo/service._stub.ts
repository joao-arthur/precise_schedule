import type { UserUniqueInfoService } from "./service.ts";

export class UserUniqueInfoServiceStub implements UserUniqueInfoService {
    public async validateNew(): Promise<void> {}

    public async validateExisting(): Promise<void> {}
}
