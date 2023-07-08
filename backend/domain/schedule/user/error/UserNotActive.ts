import { BusinessError } from "../../../general/BusinessError.ts";

export class UserNotActive extends BusinessError {
    constructor() {
        super("The user is not active!");
    }
}
