import { BusinessError } from "../../../general/BusinessError.ts";

export class EmailAlreadyRegistered extends BusinessError {
    constructor() {
        super(
            "This e-mail is already registered, please use another one!",
        );
    }
}
