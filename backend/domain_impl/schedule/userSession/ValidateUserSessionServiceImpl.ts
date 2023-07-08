import type { FindUserService } from "@ps/domain/schedule/user/find/FindUserService.ts";
import type { Session } from "@ps/domain/session/Session.ts";
import type { DecodeSessionService } from "@ps/domain/session/decode/DecodeSessionService.ts";
import type { ValidateUserSessionService } from "@ps/domain/userSession/ValidateUserSessionService.ts";

import { InvalidSessionError } from "@ps/domain/session/InvalidSessionError.ts";

export class ValidateUserSessionServiceImpl
    implements ValidateUserSessionService {
    constructor(
        private readonly findUserService: FindUserService,
        private readonly decodeSessionService: DecodeSessionService,
    ) {}

    public async validate(session: Session): Promise<void> {
        const userId = await this.decodeSessionService.decode(
            session,
        );
        try {
            await this.findUserService.findById(userId);
        } catch {
            throw new InvalidSessionError();
        }
        // if (user.status !== ACTIVE) throw invalid session
    }
}
