import type { User } from "../../schedule/user/model.ts";
import type { DecodeSessionService } from "./service.ts";

export class DecodeSessionServiceStub implements DecodeSessionService {
    constructor(private readonly userId: User["id"]) {}

    public decode(): Promise<User["id"]> {
        return Promise.resolve(this.userId);
    }
}
