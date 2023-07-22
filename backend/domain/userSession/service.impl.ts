import type { UserFindService } from "../schedule/user/find/service.ts";
import type { Session } from "../session/model.ts";
import type { DecodeSessionService } from "../session/decode/service.ts";
import type { ValidateUserSessionService } from "./service.ts";

import { InvalidSessionError } from "../session/InvalidSessionError.ts";

export class ValidateUserSessionServiceImpl implements ValidateUserSessionService {
    constructor(
        private readonly userFindService: UserFindService,
        private readonly decodeSessionService: DecodeSessionService,
    ) {}

    public async validate(session: Session): Promise<void> {
        const userId = await this.decodeSessionService.decode(session);
        try {
            await this.userFindService.findById(userId);
        } catch {
            throw new InvalidSessionError();
        }
    }
}
