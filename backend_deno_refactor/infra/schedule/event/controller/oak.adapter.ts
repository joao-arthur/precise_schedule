import type { EventRepository } from "../../../../domain/schedule/event/repository.ts";
import type { IdGenerator } from "../../../../domain/generator/id/service.ts";
import type { ValidatorService } from "../../../../domain/validation/validator/service.ts";
import { Router } from "oak/mod.ts";
import { eventFind } from "../../../../domain/schedule/event/find/service.ts";
import { eventDelete } from "../../../../domain/schedule/event/delete/service.ts";
import { eventCreate } from "../../../../domain/schedule/event/create/service.ts";
import { eventUpdate } from "../../../../domain/schedule/event/update/service.ts";
import { appointmentCreate } from "../../../../domain/schedule/event/appointment/create/service.ts";
import { birthdayCreate } from "../../../../domain/schedule/event/birthday/create/service.ts";
import { dateCreate } from "../../../../domain/schedule/event/date/create/service.ts";
import { meetingCreate } from "../../../../domain/schedule/event/meeting/create/service.ts";
import { partyCreate } from "../../../../domain/schedule/event/party/create/service.ts";
import { appointmentUpdate } from "../../../../domain/schedule/event/appointment/update/service.ts";
import { birthdayUpdate } from "../../../../domain/schedule/event/birthday/update/service.ts";
import { dateUpdate } from "../../../../domain/schedule/event/date/update/service.ts";
import { meetingUpdate } from "../../../../domain/schedule/event/meeting/update/service.ts";
import { partyUpdate } from "../../../../domain/schedule/event/party/update/service.ts";
import { EventFindControllerImpl } from "../../../../application/schedule/event/find/controller.impl.ts";
import { FindAllEventControllerImpl } from "../../../../application/schedule/event/findAll/controller.impl.ts";
import { EventDeleteControllerImpl } from "../../../../application/schedule/event/delete/controller.impl.ts";
import { AppointmentCreateControllerImpl } from "../../../../application/schedule/event/appointment/create/controller.impl.ts";
import { BirthdayCreateControllerImpl } from "../../../../application/schedule/event/birthday/create/controller.impl.ts";
import { DateCreateControllerImpl } from "../../../../application/schedule/event/date/create/controller.impl.ts";
import { MeetingCreateControllerImpl } from "../../../../application/schedule/event/meeting/create/controller.impl.ts";
import { PartyCreateControllerImpl } from "../../../../application/schedule/event/party/create/controller.impl.ts";
import { AppointmentUpdateControllerImpl } from "../../../../application/schedule/event/appointment/update/controller.impl.ts";
import { BirthdayUpdateControllerImpl } from "../../../../application/schedule/event/birthday/update/controller.impl.ts";
import { DateUpdateControllerImpl } from "../../../../application/schedule/event/date/update/controller.impl.ts";
import { MeetingUpdateControllerImpl } from "../../../../application/schedule/event/meeting/update/controller.impl.ts";
import { PartyUpdateControllerImpl } from "../../../../application/schedule/event/party/update/controller.impl.ts";
import { makeBody } from "../../../http/makeBody.ts";
import { makeParams } from "../../../http/makeParams.ts";
import { makeResult } from "../../../http/makeResult.ts";
import { makeUserId } from "../../../http/makeUserId.ts";

export class EventControllerOakAdapter {
    constructor(
        private readonly idGenerator: IdGenerator,
        private readonly validator: ValidatorService,
        private readonly repository: EventRepository,
    ) {}

    // deno-lint-ignore no-explicit-any
    public initRoutes(router: Router<Record<string, any>>): void {
        router
            .get("/event/:id", async (ctx) => {
                const userId = await makeUserId(ctx);
                const params = await makeParams(ctx);
                const service = new EventFindServiceImpl(
                    new EventFindFactoryImpl(),
                    this.repository,
                );
                const controller = new EventFindControllerImpl(service);
                const res = await controller.handle(userId, { params });
                makeResult(res, ctx);
            })
            .get("/event", async (ctx) => {
                const userId = await makeUserId(ctx);
                const service = new EventFindServiceImpl(
                    new EventFindFactoryImpl(),
                    this.repository,
                );
                const controller = new FindAllEventControllerImpl(service);
                const res = await controller.handle(userId);
                makeResult(res, ctx);
            })
            .delete("/event/:id", async (ctx) => {
                const userId = await makeUserId(ctx);
                const params = await makeParams(ctx);
                const service = new EventDeleteServiceImpl(
                    this.repository,
                    new EventFindServiceImpl(new EventFindFactoryImpl(), this.repository),
                );
                const controller = new EventDeleteControllerImpl(service);
                const res = await controller.handle(userId, { params });
                makeResult(res, ctx);
            })
            .post("/event/APPOINTMENT", async (ctx) => {
                const userId = await makeUserId(ctx);
                const body = await makeBody(ctx);
                const createEventService = new EventCreateServiceImpl(
                    this.repository,
                    new EventCreateFactoryImpl(this.idGenerator),
                );
                const service = new AppointmentCreateServiceImpl(
                    this.validator,
                    new AppointmentCreateFactoryImpl(),
                    createEventService,
                );
                const controller = new AppointmentCreateControllerImpl(service);
                const res = await controller.handle(userId, { body });
                makeResult(res, ctx);
            })
            .post("/event/BIRTHDAY", async (ctx) => {
                const userId = await makeUserId(ctx);
                const body = await makeBody(ctx);
                const createEventService = new EventCreateServiceImpl(
                    this.repository,
                    new EventCreateFactoryImpl(this.idGenerator),
                );
                const service = new BirthdayCreateServiceImpl(
                    this.validator,
                    new BirthdayCreateFactoryImpl(),
                    createEventService,
                );
                const controller = new BirthdayCreateControllerImpl(service);
                const res = await controller.handle(userId, { body });
                makeResult(res, ctx);
            })
            .post("/event/DATE", async (ctx) => {
                const userId = await makeUserId(ctx);
                const body = await makeBody(ctx);
                const createEventService = new EventCreateServiceImpl(
                    this.repository,
                    new EventCreateFactoryImpl(this.idGenerator),
                );
                const service = new DateCreateServiceImpl(
                    this.validator,
                    new DateCreateFactoryImpl(),
                    createEventService,
                );
                const controller = new DateCreateControllerImpl(service);
                const res = await controller.handle(userId, { body });
                makeResult(res, ctx);
            })
            .post("/event/MEETING", async (ctx) => {
                const userId = await makeUserId(ctx);
                const body = await makeBody(ctx);
                const createEventService = new EventCreateServiceImpl(
                    this.repository,
                    new EventCreateFactoryImpl(this.idGenerator),
                );
                const service = new MeetingCreateServiceImpl(
                    this.validator,
                    new MeetingCreateFactoryImpl(),
                    createEventService,
                );
                const controller = new MeetingCreateControllerImpl(service);
                const res = await controller.handle(userId, { body });
                makeResult(res, ctx);
            })
            .post("/event/PARTY", async (ctx) => {
                const userId = await makeUserId(ctx);
                const body = await makeBody(ctx);
                const createEventService = new EventCreateServiceImpl(
                    this.repository,
                    new EventCreateFactoryImpl(this.idGenerator),
                );
                const service = new PartyCreateServiceImpl(
                    this.validator,
                    new PartyCreateFactoryImpl(),
                    createEventService,
                );
                const controller = new PartyCreateControllerImpl(service);
                const res = await controller.handle(userId, { body });
                makeResult(res, ctx);
            })
            .put("/event/APPOINTMENT/:id", async (ctx) => {
                const userId = await makeUserId(ctx);
                const body = await makeBody(ctx);
                const params = await makeParams(ctx);
                const eventUpdateService = new EventUpdateServiceImpl(
                    this.repository,
                    new EventUpdateFactoryImpl(),
                    new EventFindServiceImpl(new EventFindFactoryImpl(), this.repository),
                );
                const service = new AppointmentUpdateServiceImpl(
                    this.validator,
                    new AppointmentUpdateFactoryImpl(),
                    eventUpdateService,
                );
                const controller = new AppointmentUpdateControllerImpl(service);
                const res = await controller.handle(userId, { body, params });
                makeResult(res, ctx);
            })
            .put("/event/BIRTHDAY/:id", async (ctx) => {
                const userId = await makeUserId(ctx);
                const body = await makeBody(ctx);
                const params = await makeParams(ctx);
                const eventUpdateService = new EventUpdateServiceImpl(
                    this.repository,
                    new EventUpdateFactoryImpl(),
                    new EventFindServiceImpl(new EventFindFactoryImpl(), this.repository),
                );
                const service = new BirthdayUpdateServiceImpl(
                    this.validator,
                    new BirthdayUpdateFactoryImpl(),
                    eventUpdateService,
                );
                const controller = new BirthdayUpdateControllerImpl(service);
                const res = await controller.handle(userId, { body, params });
                makeResult(res, ctx);
            })
            .put("/event/DATE/:id", async (ctx) => {
                const userId = await makeUserId(ctx);
                const body = await makeBody(ctx);
                const params = await makeParams(ctx);
                const eventUpdateService = new EventUpdateServiceImpl(
                    this.repository,
                    new EventUpdateFactoryImpl(),
                    new EventFindServiceImpl(new EventFindFactoryImpl(), this.repository),
                );
                const service = new DateUpdateServiceImpl(
                    this.validator,
                    new DateUpdateFactoryImpl(),
                    eventUpdateService,
                );
                const controller = new DateUpdateControllerImpl(service);
                const res = await controller.handle(userId, { body, params });
                makeResult(res, ctx);
            })
            .put("/event/MEETING/:id", async (ctx) => {
                const userId = await makeUserId(ctx);
                const body = await makeBody(ctx);
                const params = await makeParams(ctx);
                const eventUpdateService = new EventUpdateServiceImpl(
                    this.repository,
                    new EventUpdateFactoryImpl(),
                    new EventFindServiceImpl(new EventFindFactoryImpl(), this.repository),
                );
                const service = new MeetingUpdateServiceImpl(
                    this.validator,
                    new MeetingUpdateFactoryImpl(),
                    eventUpdateService,
                );
                const controller = new MeetingUpdateControllerImpl(service);
                const res = await controller.handle(userId, { body, params });
                makeResult(res, ctx);
            })
            .put("/event/PARTY/:id", async (ctx) => {
                const userId = await makeUserId(ctx);
                const body = await makeBody(ctx);
                const params = await makeParams(ctx);
                const eventUpdateService = new EventUpdateServiceImpl(
                    this.repository,
                    new EventUpdateFactoryImpl(),
                    new EventFindServiceImpl(new EventFindFactoryImpl(), this.repository),
                );
                const service = new PartyUpdateServiceImpl(
                    this.validator,
                    new PartyUpdateFactoryImpl(),
                    eventUpdateService,
                );
                const controller = new PartyUpdateControllerImpl(service);
                const res = await controller.handle(userId, { body, params });
                makeResult(res, ctx);
            });
    }
}
