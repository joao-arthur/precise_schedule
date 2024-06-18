import type { User } from "../../../domain/schedule/user/model.ts";
import type { EventRepo } from "../../../domain/schedule/event/repo.ts";
import type { HTTPRequest } from "../../http/request.ts";
import type { HTTPResponse } from "../../http/response.ts";
import { eventDelete } from "../../../domain/schedule/event/delete.ts";
import {
    eventInfoReadManyService,
    eventInfoReadOneService,
} from "../../../domain/schedule/event/read.ts";
import { noContent } from "../../http/response.ts";
import { errorHandler } from "../../http/errorHandler.ts";
import { ok } from "../../http/response.ts";

export async function eventDeleteController(
    repo: EventRepo,
    userId: User["id"],
    req: HTTPRequest,
): Promise<HTTPResponse> {
    const result = await eventDelete(repo, userId, req.params.id!);
    switch (result.type) {
        case "ok":
            return noContent();
        case "err":
            return errorHandler(result.error);
    }
}

export async function eventInfoReadManyController(
    repo: EventRepo,
    userId: User["id"],
): Promise<HTTPResponse> {
    const result = await eventInfoReadManyService(repo, userId);
    switch (result.type) {
        case "ok":
            return ok(result.data);
        case "err":
            return errorHandler(result.error);
    }
}

export async function eventInfoReadOneController(
    repo: EventRepo,
    userId: User["id"],
    req: HTTPRequest,
): Promise<HTTPResponse> {
    const result = await eventInfoReadOneService(repo, userId, req.params.id!);
    switch (result.type) {
        case "ok":
            return ok(result.data);
        case "err":
            return errorHandler(result.error);
    }
}
