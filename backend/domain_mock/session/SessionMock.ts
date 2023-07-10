import type { Session } from "@ps/domain/session/Session.ts";

export const sessionMock: Session = {
    token: "token",
};

export const maybeSessionMock: Partial<Session> = {
    token: undefined,
};
