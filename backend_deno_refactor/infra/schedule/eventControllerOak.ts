import type { Router } from "oak/mod.ts";
import type { EventRepo } from "../../domain/schedule/event/repo.ts";
import type { IdGenerator } from "../../domain/generator/id.ts";
import type { DateGenerator } from "../../domain/generator/date.ts";
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
import { reqBuild } from "../../application/http/request.ts";
import {
    appointmentCreateController,
    appointmentUpdateController,
} from "../../application/schedule/event/appointment.ts";
import {
    birthdayCreateController,
    birthdayUpdateController,
} from "../../application/schedule/event/birthday.ts";
import {
    meetingCreateController,
    meetingUpdateController,
} from "../../application/schedule/event/meeting.ts";
import {
    partyCreateController,
    partyUpdateController,
} from "../../application/schedule/event/party.ts";
import {
    dateCreateController,
    dateUpdateController,
} from "../../application/schedule/event/date.ts";
import {
    eventDeleteController,
    eventInfoReadManyController,
    eventInfoReadOneController,
} from "../../application/schedule/event/event.ts";
import { bodyBuild, paramsBuild, resultBuild, userIdBuild } from "../http/httpOak.ts";

export function eventControllerOak(
    repo: EventRepo,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator,
    router: Router,
): void {
    router
        .get("/event/:id", async (ctx) => {
            const userId = await userIdBuild(ctx);
            const params = await paramsBuild(ctx);
            const req = reqBuild(undefined, params, {});
            const res = await eventInfoReadOneController(repo, userId, req);
            resultBuild(res, ctx);
        })
        .get("/event", async (ctx) => {
            const userId = await userIdBuild(ctx);
            const res = await eventInfoReadManyController(repo, userId);
            resultBuild(res, ctx);
        })
        .delete("/event/:id", async (ctx) => {
            const userId = await userIdBuild(ctx);
            const params = await paramsBuild(ctx);
            const req = reqBuild(undefined, params, {});
            const res = await eventDeleteController(repo, userId, req);
            resultBuild(res, ctx);
        })
        .post("/event/APPOINTMENT", async (ctx) => {
            const userId = await userIdBuild(ctx);
            const body = await bodyBuild<AppointmentCreate>(ctx);
            const req = reqBuild(body, {}, {});
            const res = await appointmentCreateController(
                repo,
                idGenerator,
                dateGenerator,
                userId,
                req,
            );
            resultBuild(res, ctx);
        })
        .post("/event/BIRTHDAY", async (ctx) => {
            const userId = await userIdBuild(ctx);
            const body = await bodyBuild<BirthdayCreate>(ctx);
            const req = reqBuild(body, {}, {});
            const res = await birthdayCreateController(
                repo,
                idGenerator,
                dateGenerator,
                userId,
                req,
            );
            resultBuild(res, ctx);
        })
        .post("/event/DATE", async (ctx) => {
            const userId = await userIdBuild(ctx);
            const body = await bodyBuild<DateCreate>(ctx);
            const req = reqBuild(body, {}, {});
            const res = await dateCreateController(repo, idGenerator, dateGenerator, userId, req);
            resultBuild(res, ctx);
        })
        .post("/event/MEETING", async (ctx) => {
            const userId = await userIdBuild(ctx);
            const body = await bodyBuild<MeetingCreate>(ctx);
            const req = reqBuild(body, {}, {});
            const res = await meetingCreateController(
                repo,
                idGenerator,
                dateGenerator,
                userId,
                req,
            );
            resultBuild(res, ctx);
        })
        .post("/event/PARTY", async (ctx) => {
            const userId = await userIdBuild(ctx);
            const body = await bodyBuild<PartyCreate>(ctx);
            const req = reqBuild(body, {}, {});
            const res = await partyCreateController(repo, idGenerator, dateGenerator, userId, req);
            resultBuild(res, ctx);
        })
        .put("/event/APPOINTMENT/:id", async (ctx) => {
            const userId = await userIdBuild(ctx);
            const body = await bodyBuild<AppointmentUpdate>(ctx);
            const params = await paramsBuild(ctx);
            const req = reqBuild(body, params, {});
            const res = await appointmentUpdateController(repo, dateGenerator, userId, req);
            resultBuild(res, ctx);
        })
        .put("/event/BIRTHDAY/:id", async (ctx) => {
            const userId = await userIdBuild(ctx);
            const body = await bodyBuild<BirthdayUpdate>(ctx);
            const params = await paramsBuild(ctx);
            const req = reqBuild(body, params, {});
            const res = await birthdayUpdateController(repo, dateGenerator, userId, req);
            resultBuild(res, ctx);
        })
        .put("/event/DATE/:id", async (ctx) => {
            const userId = await userIdBuild(ctx);
            const body = await bodyBuild<DateUpdate>(ctx);
            const params = await paramsBuild(ctx);
            const req = reqBuild(body, params, {});
            const res = await dateUpdateController(repo, dateGenerator, userId, req);
            resultBuild(res, ctx);
        })
        .put("/event/MEETING/:id", async (ctx) => {
            const userId = await userIdBuild(ctx);
            const body = await bodyBuild<MeetingUpdate>(ctx);
            const params = await paramsBuild(ctx);
            const req = reqBuild(body, params, {});
            const res = await meetingUpdateController(repo, dateGenerator, userId, req);
            resultBuild(res, ctx);
        })
        .put("/event/PARTY/:id", async (ctx) => {
            const userId = await userIdBuild(ctx);
            const body = await bodyBuild<PartyUpdate>(ctx);
            const params = await paramsBuild(ctx);
            const req = reqBuild(body, params, {});
            const res = await partyUpdateController(repo, dateGenerator, userId, req);
            resultBuild(res, ctx);
        });
}
