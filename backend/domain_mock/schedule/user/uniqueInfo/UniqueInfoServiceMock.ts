import type { UniqueInfoService } from "@ps/domain/schedule/user/uniqueInfo/UniqueInfoService.ts";

export class UniqueInfoServiceMock implements UniqueInfoService {
    public async validateNew(): Promise<void> {}

    public async validateExisting(): Promise<void> {}
}
