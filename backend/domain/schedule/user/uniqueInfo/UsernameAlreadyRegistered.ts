import { BusinessError } from "../../../general/BusinessError.ts";

export class UsernameAlreadyRegistered extends BusinessError {
    constructor() {
        super(
            "This username is already registered, please use another one!",
        );
    }
}
