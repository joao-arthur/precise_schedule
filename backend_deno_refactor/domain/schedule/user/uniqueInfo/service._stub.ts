import type { Result } from "../../../lang/result.ts";
import type { UsernameAlreadyRegistered } from "./error.usernameAlreadyRegistered.ts";
import type { EmailAlreadyRegistered } from "./error.emailAlreadyRegistered.ts";
import type { UserUniqueInfoService } from "./service.ts";

import { buildOk } from "../../../lang/result.ts";

export class UserUniqueInfoServiceStub implements UserUniqueInfoService {
    public validateNew(): Promise<
        Result<void, UsernameAlreadyRegistered | EmailAlreadyRegistered>
    > {
        return Promise.resolve(buildOk(undefined));
    }

    public validateExisting(): Promise<
        Result<void, UsernameAlreadyRegistered | EmailAlreadyRegistered>
    > {
        return Promise.resolve(buildOk(undefined));
    }
}
