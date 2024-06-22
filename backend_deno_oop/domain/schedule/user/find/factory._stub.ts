import { UserFindModel } from "./model.ts";
import { UserFindFactory } from "./factory.ts";

export class UserFindFactoryStub implements UserFindFactory {
    constructor(private readonly user: UserFindModel) {}

    public build(): UserFindModel {
        return this.user;
    }
}
