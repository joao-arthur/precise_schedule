import { ValidateUserSessionService } from "@ps/domain/userSession/ValidateUserSessionService.ts";

export class ValidateUserSessionServiceMock implements ValidateUserSessionService {
    public async validate(): Promise<void> {}
}
