import { fromForm } from "./fromForm.js";
import { toForm } from "./toForm.js";
import { toEvent } from "./toEvent.js";

export const appointmentEventFns = {
    fromForm,
    toForm,
    toEvent,
} as const;
