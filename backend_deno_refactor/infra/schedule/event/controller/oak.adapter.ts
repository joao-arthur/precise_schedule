import type { EventRepository } from "@ps/domain/schedule/event/repository.ts";
import type { IdGenerator } from "@ps/domain/generator/id/service.ts";
import type { ValidatorService } from "@ps/domain/validation/validator/service.ts";
import { Router } from "oak/mod.ts";
import { EventFindServiceImpl } from "@ps/domain/schedule/event/find/service.impl.ts";
import { EventFindFactoryImpl } from "@ps/domain/schedule/event/find/factory.ts";
import { EventDeleteServiceImpl } from "@ps/domain/schedule/event/delete/service.impl.ts";
import { EventCreateServiceImpl } from "@ps/domain/schedule/event/create/service.impl.ts";
import { EventCreateFactoryImpl } from "@ps/domain/schedule/event/create/factory.ts";
import { EventUpdateServiceImpl } from "@ps/domain/schedule/event/update/service.impl.ts";
import { EventUpdateFactoryImpl } from "@ps/domain/schedule/event/update/factory.ts";
import { AppointmentCreateFactoryImpl } from "@ps/domain/schedule/event/appointment/create/factory.ts";
import { AppointmentCreateServiceImpl } from "@ps/domain/schedule/event/appointment/create/service.impl.ts";
import { BirthdayCreateFactoryImpl } from "@ps/domain/schedule/event/birthday/create/factory.ts";
import { BirthdayCreateServiceImpl } from "@ps/domain/schedule/event/birthday/create/service.impl.ts";
import { DateCreateFactoryImpl } from "@ps/domain/schedule/event/date/create/factory.ts";
import { DateCreateServiceImpl } from "@ps/domain/schedule/event/date/create/service.impl.ts";
import { MeetingCreateFactoryImpl } from "@ps/domain/schedule/event/meeting/create/factory.ts";
import { MeetingCreateServiceImpl } from "@ps/domain/schedule/event/meeting/create/service.impl.ts";
import { PartyCreateFactoryImpl } from "@ps/domain/schedule/event/party/create/factory.ts";
import { PartyCreateServiceImpl } from "@ps/domain/schedule/event/party/create/service.impl.ts";
import { AppointmentUpdateFactoryImpl } from "@ps/domain/schedule/event/appointment/update/factory.ts";
import { AppointmentUpdateServiceImpl } from "@ps/domain/schedule/event/appointment/update/service.impl.ts";
import { BirthdayUpdateFactoryImpl } from "@ps/domain/schedule/event/birthday/update/factory.ts";
import { BirthdayUpdateServiceImpl } from "@ps/domain/schedule/event/birthday/update/service.impl.ts";
import { DateUpdateFactoryImpl } from "@ps/domain/schedule/event/date/update/factory.ts";
import { DateUpdateServiceImpl } from "@ps/domain/schedule/event/date/update/service.impl.ts";
import { MeetingUpdateFactoryImpl } from "@ps/domain/schedule/event/meeting/update/factory.ts";
import { MeetingUpdateServiceImpl } from "@ps/domain/schedule/event/meeting/update/service.impl.ts";
import { PartyUpdateFactoryImpl } from "@ps/domain/schedule/event/party/update/factory.ts";
import { PartyUpdateServiceImpl } from "@ps/domain/schedule/event/party/update/service.impl.ts";
import { EventFindControllerImpl } from "@ps/application/schedule/event/find/controller.impl.ts";
import { FindAllEventControllerImpl } from "@ps/application/schedule/event/findAll/controller.impl.ts";
import { EventDeleteControllerImpl } from "@ps/application/schedule/event/delete/controller.impl.ts";
import { AppointmentCreateControllerImpl } from "@ps/application/schedule/event/appointment/create/controller.impl.ts";
import { BirthdayCreateControllerImpl } from "@ps/application/schedule/event/birthday/create/controller.impl.ts";
import { DateCreateControllerImpl } from "@ps/application/schedule/event/date/create/controller.impl.ts";
import { MeetingCreateControllerImpl } from "@ps/application/schedule/event/meeting/create/controller.impl.ts";
import { PartyCreateControllerImpl } from "@ps/application/schedule/event/party/create/controller.impl.ts";
import { AppointmentUpdateControllerImpl } from "@ps/application/schedule/event/appointment/update/controller.impl.ts";
import { BirthdayUpdateControllerImpl } from "@ps/application/schedule/event/birthday/update/controller.impl.ts";
import { DateUpdateControllerImpl } from "@ps/application/schedule/event/date/update/controller.impl.ts";
import { MeetingUpdateControllerImpl } from "@ps/application/schedule/event/meeting/update/controller.impl.ts";
import { PartyUpdateControllerImpl } from "@ps/application/schedule/event/party/update/controller.impl.ts";
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
