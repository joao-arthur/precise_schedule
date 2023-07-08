import type { User } from "@ps/domain/schedule/user/User.ts";
import type { DecodeSessionService } from "@ps/domain/session/decode/DecodeSessionService.ts";

export class DecodeSessionServiceMock
    implements DecodeSessionService {
    constructor(private readonly userId: User["id"]) {}

    public decode(): Promise<User["id"]> {
        return Promise.resolve(this.userId);
    }
}
