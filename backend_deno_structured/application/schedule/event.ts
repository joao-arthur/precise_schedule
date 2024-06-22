import type { IdGenerator } from "../../domain/generator.ts";
import type { DateGenerator } from "../../domain/generator.ts";
import type { User } from "../../domain/schedule/user/model.ts";
import type { EventRepo } from "../../domain/schedule/event/repo.ts";
import type { AppointmentCreate } from "../../domain/schedule/event/appointment/create.ts";
import type { AppointmentUpdate } from "../../domain/schedule/event/appointment/update.ts";
import type { BirthdayCreate } from "../../domain/schedule/event/birthday/create.ts";
import type { BirthdayUpdate } from "../../domain/schedule/event/birthday/update.ts";
import type { DateCreate } from "../../domain/schedule/event/date/create.ts";
import type { DateUpdate } from "../../domain/schedule/event/date/update.ts";
import type { MeetingCreate } from "../../domain/schedule/event/meeting/create.ts";
import type { MeetingUpdate } from "../../domain/schedule/event/meeting/update.ts";
import type { PartyCreate } from "../../domain/schedule/event/party/create.ts";
import type { PartyUpdate } from "../../domain/schedule/event/party/update.ts";
import type { HTTPRequest } from "../http/request.ts";
import type { HTTPResponse } from "../http/response.ts";
import { eventDelete } from "../../domain/schedule/event/delete.ts";
import {
    eventInfoReadManyService,
    eventInfoReadOneService,
} from "../../domain/schedule/event/read.ts";
import { appointmentCreateService } from "../../domain/schedule/event/appointment/create.ts";
import { appointmentUpdateService } from "../../domain/schedule/event/appointment/update.ts";
import { birthdayCreateService } from "../../domain/schedule/event/birthday/create.ts";
import { birthdayUpdateService } from "../../domain/schedule/event/birthday/update.ts";
import { dateCreateService } from "../../domain/schedule/event/date/create.ts";
import { dateUpdateService } from "../../domain/schedule/event/date/update.ts";
import { meetingCreateService } from "../../domain/schedule/event/meeting/create.ts";
import { meetingUpdateService } from "../../domain/schedule/event/meeting/update.ts";
import { partyCreateService } from "../../domain/schedule/event/party/create.ts";
import { partyUpdateService } from "../../domain/schedule/event/party/update.ts";
import { errorHandler } from "../http/errorHandler.ts";
import { created, noContent, ok } from "../http/response.ts";

export async function eventDeleteEndpoint(
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

export async function eventInfoReadManyEndpoint(
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

export async function eventInfoReadOneEndpoint(
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

export async function appointmentCreateEndpoint(
    repo: EventRepo,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<AppointmentCreate>,
): Promise<HTTPResponse> {
    const result = await appointmentCreateService(
        repo,
        idGenerator,
        dateGenerator,
        userId,
        req.body,
    );
    switch (result.type) {
        case "ok":
            return created(result.data);
        case "err":
            return errorHandler(result.error);
    }
}

export async function appointmentUpdateEndpoint(
    repo: EventRepo,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<AppointmentUpdate>,
): Promise<HTTPResponse> {
    const result = await appointmentUpdateService(
        repo,
        dateGenerator,
        userId,
        req.params.id!,
        req.body,
    );
    switch (result.type) {
        case "ok":
            return noContent();
        case "err":
            return errorHandler(result.error);
    }
}

export async function birthdayCreateEndpoint(
    repo: EventRepo,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<BirthdayCreate>,
): Promise<HTTPResponse> {
    const result = await birthdayCreateService(repo, idGenerator, dateGenerator, userId, req.body);
    switch (result.type) {
        case "ok":
            return created(result.data);
        case "err":
            return errorHandler(result.error);
    }
}

export async function birthdayUpdateEndpoint(
    repo: EventRepo,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<BirthdayUpdate>,
): Promise<HTTPResponse> {
    const result = await birthdayUpdateService(
        repo,
        dateGenerator,
        userId,
        req.params.id!,
        req.body,
    );
    switch (result.type) {
        case "ok":
            return noContent();
        case "err":
            return errorHandler(result.error);
    }
}

export async function dateCreateEndpoint(
    repo: EventRepo,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<DateCreate>,
): Promise<HTTPResponse> {
    const result = await dateCreateService(repo, idGenerator, dateGenerator, userId, req.body);
    switch (result.type) {
        case "ok":
            return created(result.data);
        case "err":
            return errorHandler(result.error);
    }
}

export async function dateUpdateEndpoint(
    repo: EventRepo,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<DateUpdate>,
): Promise<HTTPResponse> {
    const result = await dateUpdateService(repo, dateGenerator, userId, req.params.id!, req.body);
    switch (result.type) {
        case "ok":
            return noContent();
        case "err":
            return errorHandler(result.error);
    }
}

export async function meetingCreateEndpoint(
    repo: EventRepo,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<MeetingCreate>,
): Promise<HTTPResponse> {
    const result = await meetingCreateService(repo, idGenerator, dateGenerator, userId, req.body);
    switch (result.type) {
        case "ok":
            return created(result.data);
        case "err":
            return errorHandler(result.error);
    }
}

export async function meetingUpdateEndpoint(
    repo: EventRepo,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<MeetingUpdate>,
): Promise<HTTPResponse> {
    const result = await meetingUpdateService(
        repo,
        dateGenerator,
        userId,
        req.params.id!,
        req.body,
    );
    switch (result.type) {
        case "ok":
            return noContent();
        case "err":
            return errorHandler(result.error);
    }
}

export async function partyCreateEndpoint(
    repo: EventRepo,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<PartyCreate>,
): Promise<HTTPResponse> {
    const result = await partyCreateService(repo, idGenerator, dateGenerator, userId, req.body);
    switch (result.type) {
        case "ok":
            return created(result.data);
        case "err":
            return errorHandler(result.error);
    }
}

export async function partyUpdateEndpoint(
    repo: EventRepo,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<PartyUpdate>,
): Promise<HTTPResponse> {
    const result = await partyUpdateService(repo, dateGenerator, userId, req.params.id!, req.body);
    switch (result.type) {
        case "ok":
            return noContent();
        case "err":
            return errorHandler(result.error);
    }
}
