import type { EventCreateModel } from "../../create/model.ts";
import type { BirthdayCreateModel } from "./model.ts";

export type BirthdayCreateFactory = {
    readonly build: (event: BirthdayCreateModel) => EventCreateModel;
};
