import type { Result } from "../../../lang/result.ts";
import type { UserUniqueInfoErrors, UserUniqueInfoService } from "./service.ts";
import { ok } from "../../../lang/result.ts";

export class UserUniqueInfoServiceStub implements UserUniqueInfoService {
    public validateNew(): Promise<Result<void, UserUniqueInfoErrors>> {
        return Promise.resolve(ok(undefined));
    }

    public validateExisting(): Promise<Result<void, UserUniqueInfoErrors>> {
        return Promise.resolve(ok(undefined));
    }
}
