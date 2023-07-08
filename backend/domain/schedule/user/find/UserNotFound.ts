import { BusinessError } from "../../../general/BusinessError.ts";

export class UserNotFound extends BusinessError {
    constructor() {
        super("The user was not found!");
    }
}
