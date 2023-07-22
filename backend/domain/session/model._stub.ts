import type { Session } from "./model.ts";

export const sessionStub: Session = {
    token: "token",
};

export const maybeSessionStub: Partial<Session> = {
    token: undefined,
};
