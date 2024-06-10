import type { Result } from "../../../lang/result.ts";
import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";

export type EventDeleteService = {
    readonly del: (userId: User["id"], id: Event["id"]) => Promise<Result<void>>;
};
