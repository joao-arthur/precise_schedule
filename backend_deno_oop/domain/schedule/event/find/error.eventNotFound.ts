import { BusinessError } from "../../../general/business/error.ts";

export class EventNotFound extends BusinessError {
    constructor() {
        super("The event was not found!");
    }
}
