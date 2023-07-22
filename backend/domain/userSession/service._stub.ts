import { ValidateUserSessionService } from "./service.ts";

export class ValidateUserSessionServiceStub implements ValidateUserSessionService {
    public async validate(): Promise<void> {}
}
