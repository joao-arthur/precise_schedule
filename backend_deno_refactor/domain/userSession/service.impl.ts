import type { Result } from "../lang/result.ts";
import type { UserFindService } from "../schedule/user/find/service.ts";
import type { Session } from "../session/model.ts";
import type { DecodeSessionService } from "../session/decode/service.ts";
import type { ValidateUserSessionService } from "./service.ts";

import { buildErr, buildOk } from "../lang/result.ts";
import { InvalidSessionError } from "../session/invalid/error.ts";

export class ValidateUserSessionServiceImpl implements ValidateUserSessionService {
    constructor(
        private readonly userFindService: UserFindService,
        private readonly decodeSessionService: DecodeSessionService,
    ) {}

    public async validate(session: Session): Promise<Result<void, InvalidSessionError>> {
        const userId = await this.decodeSessionService.decode(session);
        if (userId.type === "err") {
            return buildErr(new InvalidSessionError());
        }
        const user = await this.userFindService.findById(userId.data);
        if (user.type === "err") {
            return buildErr(new InvalidSessionError());
        }
        return buildOk(undefined);
    }
}
