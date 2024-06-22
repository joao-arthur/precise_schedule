import { BusinessError } from "../../../general/business/error.ts";

export class UserNotActive extends BusinessError {
    constructor() {
        super("The user is not active!");
    }
}
