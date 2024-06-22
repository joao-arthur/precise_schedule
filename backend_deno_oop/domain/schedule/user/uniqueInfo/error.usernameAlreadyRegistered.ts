import { BusinessError } from "../../../general/business/error.ts";

export class UsernameAlreadyRegistered extends BusinessError {
    constructor() {
        super(
            "This username is already registered, please use another one!",
        );
    }
}
