import { fromForm } from "./fromForm.js";
import { toForm } from "./toForm.js";
import { toEvent } from "./toEvent.js";

export const meetingFns = {
    fromForm,
    toForm,
    toEvent,
} as const;
