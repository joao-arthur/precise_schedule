import type { UniqueInfoService } from "@ps/domain/schedule/user/uniqueInfo/UniqueInfoService.ts";

export class UniqueInfoServiceMock implements UniqueInfoService {
    public validateNew(): void {}
    public validateExisting(): void {}
}
