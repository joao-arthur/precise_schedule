import type { EventRepository } from "@ps/domain/schedule/event/EventRepository.ts";
import type { IdGenerator } from "@ps/domain/generation/IdGenerator.ts";
import type { Validator } from "@ps/domain/validation/Validator.ts";

import { Router } from "oak/mod.ts";
import { CreateEventServiceImpl } from "@ps/domain_impl/schedule/event/create/CreateEventServiceImpl.ts";
import { UpdateEventServiceImpl } from "@ps/domain_impl/schedule/event/update/UpdateEventServiceImpl.ts";
import { CreateEventFactoryImpl } from "@ps/domain_impl/schedule/event/create/CreateEventFactoryImpl.ts";
import { UpdateEventFactoryImpl } from "@ps/domain_impl/schedule/event/update/UpdateEventFactoryImpl.ts";
import { CreateAppointmentEventFactoryImpl } from "@ps/domain_impl/schedule/event/createAppointment/CreateAppointmentEventFactoryImpl.ts";
import { CreateAppointmentEventServiceImpl } from "@ps/domain_impl/schedule/event/createAppointment/CreateAppointmentEventServiceImpl.ts";
import { CreateBirthdayEventFactoryImpl } from "@ps/domain_impl/schedule/event/createBirthday/CreateBirthdayEventFactoryImpl.ts";
import { CreateBirthdayEventServiceImpl } from "@ps/domain_impl/schedule/event/createBirthday/CreateBirthdayEventServiceImpl.ts";
import { CreateDateEventFactoryImpl } from "@ps/domain_impl/schedule/event/createDate/CreateDateEventFactoryImpl.ts";
import { CreateDateEventServiceImpl } from "@ps/domain_impl/schedule/event/createDate/CreateDateEventServiceImpl.ts";
import { CreateMeetingEventFactoryImpl } from "@ps/domain_impl/schedule/event/createMeeting/CreateMeetingEventFactoryImpl.ts";
import { CreateMeetingEventServiceImpl } from "@ps/domain_impl/schedule/event/createMeeting/CreateMeetingEventServiceImpl.ts";
import { CreatePartyEventFactoryImpl } from "@ps/domain_impl/schedule/event/createParty/CreatePartyEventFactoryImpl.ts";
import { CreatePartyEventServiceImpl } from "@ps/domain_impl/schedule/event/createParty/CreatePartyEventServiceImpl.ts";
import { UpdateAppointmentEventFactoryImpl } from "@ps/domain_impl/schedule/event/updateAppointment/UpdateAppointmentEventFactoryImpl.ts";
import { UpdateAppointmentEventServiceImpl } from "@ps/domain_impl/schedule/event/updateAppointment/UpdateAppointmentEventServiceImpl.ts";
import { UpdateBirthdayEventFactoryImpl } from "@ps/domain_impl/schedule/event/updateBirthday/UpdateBirthdayEventFactoryImpl.ts";
import { UpdateBirthdayEventServiceImpl } from "@ps/domain_impl/schedule/event/updateBirthday/UpdateBirthdayEventServiceImpl.ts";
import { UpdateDateEventFactoryImpl } from "@ps/domain_impl/schedule/event/updateDate/UpdateDateEventFactoryImpl.ts";
import { UpdateDateEventServiceImpl } from "@ps/domain_impl/schedule/event/updateDate/UpdateDateEventServiceImpl.ts";
import { UpdateMeetingEventFactoryImpl } from "@ps/domain_impl/schedule/event/updateMeeting/UpdateMeetingEventFactoryImpl.ts";
import { UpdateMeetingEventServiceImpl } from "@ps/domain_impl/schedule/event/updateMeeting/UpdateMeetingEventServiceImpl.ts";
import { UpdatePartyEventFactoryImpl } from "@ps/domain_impl/schedule/event/updateParty/UpdatePartyEventFactoryImpl.ts";
import { UpdatePartyEventServiceImpl } from "@ps/domain_impl/schedule/event/updateParty/UpdatePartyEventServiceImpl.ts";
import { FindEventServiceImpl } from "@ps/domain_impl/schedule/event/find/FindEventServiceImpl.ts";
import { CreateAppointmentEventControllerImpl } from "@ps/application_impl/schedule/event/createAppointment/CreateAppointmentEventControllerImpl.ts";
import { CreateBirthdayEventControllerImpl } from "@ps/application_impl/schedule/event/createBirthday/CreateBirthdayEventControllerImpl.ts";
import { CreateDateEventControllerImpl } from "@ps/application_impl/schedule/event/createDate/CreateDateEventControllerImpl.ts";
import { CreateMeetingEventControllerImpl } from "@ps/application_impl/schedule/event/createMeeting/CreateMeetingEventControllerImpl.ts";
import { CreatePartyEventControllerImpl } from "@ps/application_impl/schedule/event/createParty/CreatePartyEventControllerImpl.ts";
import { UpdateAppointmentEventControllerImpl } from "@ps/application_impl/schedule/event/updateAppointment/UpdateAppointmentEventControllerImpl.ts";
import { UpdateBirthdayEventControllerImpl } from "@ps/application_impl/schedule/event/updateBirthday/UpdateBirthdayEventControllerImpl.ts";
import { UpdateDateEventControllerImpl } from "@ps/application_impl/schedule/event/updateDate/UpdateDateEventControllerImpl.ts";
import { UpdateMeetingEventControllerImpl } from "@ps/application_impl/schedule/event/updateMeeting/UpdateMeetingEventControllerImpl.ts";
import { UpdatePartyEventControllerImpl } from "@ps/application_impl/schedule/event/updateParty/UpdatePartyEventControllerImpl.ts";
import { makeBody } from "../../http/makeBody.ts";
import { makeParams } from "../../http/makeParams.ts";
import { makeResult } from "../../http/makeResult.ts";

export class EventControllerOakAdapter {
    constructor(
        private readonly idGenerator: IdGenerator,
        private readonly validator: Validator,
        private readonly repository: EventRepository,
    ) {}

    // deno-lint-ignore no-explicit-any
    public initRoutes(router: Router<Record<string, any>>): void {
        router
            //.get("/event", async (context) => {
            //    //204 no content
            //    await eventControllerAdapter.getEvents(context);
            //})
            .post("/event/APPOINTMENT", async (ctx) => {
                const body = await makeBody(ctx);
                const createEventService = new CreateEventServiceImpl(
                    this.repository,
                    new CreateEventFactoryImpl(this.idGenerator),
                );
                const service = new CreateAppointmentEventServiceImpl(
                    new CreateAppointmentEventFactoryImpl(),
                    createEventService,
                );
                const controller = new CreateAppointmentEventControllerImpl(service);
                const res = await controller.handle({ body });
                makeResult(res, ctx);
            })
            .post("/event/BIRTHDAY", async (ctx) => {
                const body = await makeBody(ctx);
                const createEventService = new CreateEventServiceImpl(
                    this.repository,
                    new CreateEventFactoryImpl(this.idGenerator),
                );
                const service = new CreateBirthdayEventServiceImpl(
                    new CreateBirthdayEventFactoryImpl(),
                    createEventService,
                );
                const controller = new CreateBirthdayEventControllerImpl(service);
                const res = await controller.handle({ body });
                makeResult(res, ctx);
            })
            .post("/event/DATE", async (ctx) => {
                const body = await makeBody(ctx);
                const createEventService = new CreateEventServiceImpl(
                    this.repository,
                    new CreateEventFactoryImpl(this.idGenerator),
                );
                const service = new CreateDateEventServiceImpl(
                    new CreateDateEventFactoryImpl(),
                    createEventService,
                );
                const controller = new CreateDateEventControllerImpl(service);
                const res = await controller.handle({ body });
                makeResult(res, ctx);
            })
            .post("/event/MEETING", async (ctx) => {
                const body = await makeBody(ctx);
                const createEventService = new CreateEventServiceImpl(
                    this.repository,
                    new CreateEventFactoryImpl(this.idGenerator),
                );
                const service = new CreateMeetingEventServiceImpl(
                    new CreateMeetingEventFactoryImpl(),
                    createEventService,
                );
                const controller = new CreateMeetingEventControllerImpl(service);
                const res = await controller.handle({ body });
                makeResult(res, ctx);
            })
            .post("/event/PARTY", async (ctx) => {
                const body = await makeBody(ctx);
                const createEventService = new CreateEventServiceImpl(
                    this.repository,
                    new CreateEventFactoryImpl(this.idGenerator),
                );
                const service = new CreatePartyEventServiceImpl(
                    new CreatePartyEventFactoryImpl(),
                    createEventService,
                );
                const controller = new CreatePartyEventControllerImpl(service);
                const res = await controller.handle({ body });
                makeResult(res, ctx);
            })
            .put("/event/APPOINTMENT/:id", async (ctx) => {
                const body = await makeBody(ctx);
                const params = await makeParams(ctx);
                const updateEventService = new UpdateEventServiceImpl(
                    this.repository,
                    new UpdateEventFactoryImpl(),
                    new FindEventServiceImpl(this.repository),
                );
                const service = new UpdateAppointmentEventServiceImpl(
                    new UpdateAppointmentEventFactoryImpl(),
                    updateEventService,
                );
                const controller = new UpdateAppointmentEventControllerImpl(service);
                const res = await controller.handle({ body, params });
                makeResult(res, ctx);
            })
            .put("/event/BIRTHDAY/:id", async (ctx) => {
                const body = await makeBody(ctx);
                const params = await makeParams(ctx);
                const updateEventService = new UpdateEventServiceImpl(
                    this.repository,
                    new UpdateEventFactoryImpl(),
                    new FindEventServiceImpl(this.repository),
                );
                const service = new UpdateBirthdayEventServiceImpl(
                    new UpdateBirthdayEventFactoryImpl(),
                    updateEventService,
                );
                const controller = new UpdateBirthdayEventControllerImpl(service);
                const res = await controller.handle({ body, params });
                makeResult(res, ctx);
            })
            .put("/event/DATE/:id", async (ctx) => {
                const body = await makeBody(ctx);
                const params = await makeParams(ctx);
                const updateEventService = new UpdateEventServiceImpl(
                    this.repository,
                    new UpdateEventFactoryImpl(),
                    new FindEventServiceImpl(this.repository),
                );
                const service = new UpdateDateEventServiceImpl(
                    new UpdateDateEventFactoryImpl(),
                    updateEventService,
                );
                const controller = new UpdateDateEventControllerImpl(service);
                const res = await controller.handle({ body, params });
                makeResult(res, ctx);
            })
            .put("/event/MEETING/:id", async (ctx) => {
                const body = await makeBody(ctx);
                const params = await makeParams(ctx);
                const updateEventService = new UpdateEventServiceImpl(
                    this.repository,
                    new UpdateEventFactoryImpl(),
                    new FindEventServiceImpl(this.repository),
                );
                const service = new UpdateMeetingEventServiceImpl(
                    new UpdateMeetingEventFactoryImpl(),
                    updateEventService,
                );
                const controller = new UpdateMeetingEventControllerImpl(service);
                const res = await controller.handle({ body, params });
                makeResult(res, ctx);
            })
            .put("/event/PARTY/:id", async (ctx) => {
                const body = await makeBody(ctx);
                const params = await makeParams(ctx);
                const updateEventService = new UpdateEventServiceImpl(
                    this.repository,
                    new UpdateEventFactoryImpl(),
                    new FindEventServiceImpl(this.repository),
                );
                const service = new UpdatePartyEventServiceImpl(
                    new UpdatePartyEventFactoryImpl(),
                    updateEventService,
                );
                const controller = new UpdatePartyEventControllerImpl(service);
                const res = await controller.handle({ body, params });
                makeResult(res, ctx);
            });
        //.delete("/event/:id", async (context) => {
        //    await eventControllerAdapter.getEvent(context);
        //});
    }
}
