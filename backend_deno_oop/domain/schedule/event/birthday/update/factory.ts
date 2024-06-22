import type { EventUpdateModel } from "../../update/model.ts";
import type { BirthdayUpdateModel } from "./model.ts";

export type BirthdayUpdateFactory = {
    readonly build: (event: BirthdayUpdateModel) => EventUpdateModel;
};
