import { BusinessError } from "../../../general/BusinessError.ts";

export class EventNotFound extends BusinessError {
    constructor() {
        super("The event was not found!");
    }
}
