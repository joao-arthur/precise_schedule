import { BusinessError } from "../../../general/business/error.ts";

export class UserNotFound extends BusinessError {
    constructor() {
        super("The user was not found!");
    }
}
