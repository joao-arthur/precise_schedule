import type { Session } from "@ps/domain/session/model.ts";
import type { HTTPHeaders } from "../headers/model.ts";
import type { HTTPRequest } from "../request/model.ts";

export type SessionFromRequestService = {
    readonly create: (req: HTTPRequest<undefined, undefined, HTTPHeaders>) => Partial<Session>;
};
