export class EventNotFound extends Error {
    constructor() {
        super("The event was not found!");
    }
}
