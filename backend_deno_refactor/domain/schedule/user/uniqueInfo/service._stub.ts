import type { Result } from "../../../lang/result.ts";
import type { UserUniqueInfoErrors, UserUniqueInfoService } from "./service.ts";
import { buildOk } from "../../../lang/result.ts";

export class UserUniqueInfoServiceStub implements UserUniqueInfoService {
    public validateNew(): Promise<Result<void, UserUniqueInfoErrors>> {
        return Promise.resolve(buildOk(undefined));
    }

    public validateExisting(): Promise<Result<void, UserUniqueInfoErrors>> {
        return Promise.resolve(buildOk(undefined));
    }
}
