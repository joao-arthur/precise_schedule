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

import type { UserRepository } from "@ps/domain/schedule/user/UserRepository.ts";
import { FindUserServiceImpl } from "@ps/domain_impl/schedule/user/find/FindUserServiceImpl.ts";
import { SessionMiddlewareImpl } from "@ps/application_impl/http/middleware/SessionMiddlewareImpl.ts";
import { ValidateUserSessionServiceImpl } from "@ps/domain_impl/schedule/userSession/ValidateUserSessionServiceImpl.ts";
import { DecodeSessionServiceJWTAdapter } from "@ps/infra/session/decode/DecodeSessionServiceJWTAdapter.ts";

export class EventControllerOakAdapter {
    constructor(
        private readonly idGenerator: IdGenerator,
        private readonly validator: Validator,
        private readonly repository: EventRepository,
        private readonly userRepository: UserRepository,
    ) {}

    public initRoutes(router: Router<Record<string, any>>): void {
        router
            //.get("/event", async (context) => {
            //    //204 no content
            //    await eventControllerAdapter.getEvents(context);
            //})
            .post("/event/APPOINTMENT", async (context) => {
                new SessionMiddlewareImpl(
                    new ValidateUserSessionServiceImpl(
                        new FindUserServiceImpl(this.userRepository),
                        new DecodeSessionServiceJWTAdapter(),
                    ),
                ).handle({
                    headers: {
                        Authorization: context.request.headers.get(
                            "Authorization",
                        ),
                    },
                });
                const createEventService = new CreateEventServiceImpl(
                    this.repository,
                    new CreateEventFactoryImpl(this.idGenerator),
                );
                const updateUserService =
                    new CreateAppointmentEventServiceImpl(
                        new CreateAppointmentEventFactoryImpl(),
                        createEventService,
                    );
                const updateUserController =
                    new CreateAppointmentEventControllerImpl(
                        updateUserService,
                    );
                const body = await context.request.body({
                    type: "json",
                }).value;
                const response = await updateUserController.handle({
                    body,
                });
                context.response.body = response.body;
                context.response.status = response.status;
            })
            .post("/event/BIRTHDAY", async (context) => {
                new SessionMiddlewareImpl(
                    new ValidateUserSessionServiceImpl(
                        new FindUserServiceImpl(this.userRepository),
                        new DecodeSessionServiceJWTAdapter(),
                    ),
                ).handle({
                    headers: {
                        Authorization: context.request.headers.get(
                            "Authorization",
                        ),
                    },
                });
                const createEventService = new CreateEventServiceImpl(
                    this.repository,
                    new CreateEventFactoryImpl(this.idGenerator),
                );
                const updateUserService =
                    new CreateBirthdayEventServiceImpl(
                        new CreateBirthdayEventFactoryImpl(),
                        createEventService,
                    );
                const updateUserController =
                    new CreateBirthdayEventControllerImpl(
                        updateUserService,
                    );
                const body = await context.request.body({
                    type: "json",
                }).value;
                const response = await updateUserController.handle({
                    body,
                });
                context.response.body = response.body;
                context.response.status = response.status;
            })
            .post("/event/DATE", async (context) => {
                new SessionMiddlewareImpl(
                    new ValidateUserSessionServiceImpl(
                        new FindUserServiceImpl(this.userRepository),
                        new DecodeSessionServiceJWTAdapter(),
                    ),
                ).handle({
                    headers: {
                        Authorization: context.request.headers.get(
                            "Authorization",
                        ),
                    },
                });
                const createEventService = new CreateEventServiceImpl(
                    this.repository,
                    new CreateEventFactoryImpl(this.idGenerator),
                );
                const updateUserService =
                    new CreateDateEventServiceImpl(
                        new CreateDateEventFactoryImpl(),
                        createEventService,
                    );
                const updateUserController =
                    new CreateDateEventControllerImpl(
                        updateUserService,
                    );
                const body = await context.request.body({
                    type: "json",
                }).value;
                const response = await updateUserController.handle({
                    body,
                });
                context.response.body = response.body;
                context.response.status = response.status;
            })
            .post("/event/MEETING", async (context) => {
                new SessionMiddlewareImpl(
                    new ValidateUserSessionServiceImpl(
                        new FindUserServiceImpl(this.userRepository),
                        new DecodeSessionServiceJWTAdapter(),
                    ),
                ).handle({
                    headers: {
                        Authorization: context.request.headers.get(
                            "Authorization",
                        ),
                    },
                });
                const createEventService = new CreateEventServiceImpl(
                    this.repository,
                    new CreateEventFactoryImpl(this.idGenerator),
                );
                const updateUserService =
                    new CreateMeetingEventServiceImpl(
                        new CreateMeetingEventFactoryImpl(),
                        createEventService,
                    );
                const updateUserController =
                    new CreateMeetingEventControllerImpl(
                        updateUserService,
                    );
                const body = await context.request.body({
                    type: "json",
                }).value;
                const response = await updateUserController.handle({
                    body,
                });
                context.response.body = response.body;
                context.response.status = response.status;
            })
            .post("/event/PARTY", async (context) => {
                new SessionMiddlewareImpl(
                    new ValidateUserSessionServiceImpl(
                        new FindUserServiceImpl(this.userRepository),
                        new DecodeSessionServiceJWTAdapter(),
                    ),
                ).handle({
                    headers: {
                        Authorization: context.request.headers.get(
                            "Authorization",
                        ),
                    },
                });
                const createEventService = new CreateEventServiceImpl(
                    this.repository,
                    new CreateEventFactoryImpl(this.idGenerator),
                );
                const updateUserService =
                    new CreatePartyEventServiceImpl(
                        new CreatePartyEventFactoryImpl(),
                        createEventService,
                    );
                const updateUserController =
                    new CreatePartyEventControllerImpl(
                        updateUserService,
                    );
                const body = await context.request.body({
                    type: "json",
                }).value;
                const response = await updateUserController.handle({
                    body,
                });
                context.response.body = response.body;
                context.response.status = response.status;
            })
            .put("/event/APPOINTMENT/:id", async (context) => {
                new SessionMiddlewareImpl(
                    new ValidateUserSessionServiceImpl(
                        new FindUserServiceImpl(this.userRepository),
                        new DecodeSessionServiceJWTAdapter(),
                    ),
                ).handle({
                    headers: {
                        Authorization: context.request.headers.get(
                            "Authorization",
                        ),
                    },
                });
                const updateEventService = new UpdateEventServiceImpl(
                    this.repository,
                    new UpdateEventFactoryImpl(),
                    new FindEventServiceImpl(this.repository),
                );
                const updateUserService =
                    new UpdateAppointmentEventServiceImpl(
                        new UpdateAppointmentEventFactoryImpl(),
                        updateEventService,
                    );
                const updateUserController =
                    new UpdateAppointmentEventControllerImpl(
                        updateUserService,
                    );
                const body = await context.request.body({
                    type: "json",
                }).value;
                const params = { id: context.params.id };
                const response = await updateUserController.handle({
                    body,
                    params,
                });
                context.response.body = response.body;
                context.response.status = response.status;
            })
            .put("/event/BIRTHDAY/:id", async (context) => {
                new SessionMiddlewareImpl(
                    new ValidateUserSessionServiceImpl(
                        new FindUserServiceImpl(this.userRepository),
                        new DecodeSessionServiceJWTAdapter(),
                    ),
                ).handle({
                    headers: {
                        Authorization: context.request.headers.get(
                            "Authorization",
                        ),
                    },
                });
                const updateEventService = new UpdateEventServiceImpl(
                    this.repository,
                    new UpdateEventFactoryImpl(),
                    new FindEventServiceImpl(this.repository),
                );
                const updateUserService =
                    new UpdateBirthdayEventServiceImpl(
                        new UpdateBirthdayEventFactoryImpl(),
                        updateEventService,
                    );
                const updateUserController =
                    new UpdateBirthdayEventControllerImpl(
                        updateUserService,
                    );
                const body = await context.request.body({
                    type: "json",
                }).value;
                const params = { id: context.params.id };
                const response = await updateUserController.handle({
                    body,
                    params,
                });
                context.response.body = response.body;
                context.response.status = response.status;
            })
            .put("/event/DATE/:id", async (context) => {
                new SessionMiddlewareImpl(
                    new ValidateUserSessionServiceImpl(
                        new FindUserServiceImpl(this.userRepository),
                        new DecodeSessionServiceJWTAdapter(),
                    ),
                ).handle({
                    headers: {
                        Authorization: context.request.headers.get(
                            "Authorization",
                        ),
                    },
                });
                const updateEventService = new UpdateEventServiceImpl(
                    this.repository,
                    new UpdateEventFactoryImpl(),
                    new FindEventServiceImpl(this.repository),
                );
                const updateUserService =
                    new UpdateDateEventServiceImpl(
                        new UpdateDateEventFactoryImpl(),
                        updateEventService,
                    );
                const updateUserController =
                    new UpdateDateEventControllerImpl(
                        updateUserService,
                    );
                const body = await context.request.body({
                    type: "json",
                }).value;
                const params = { id: context.params.id };
                const response = await updateUserController.handle({
                    body,
                    params,
                });
                context.response.body = response.body;
                context.response.status = response.status;
            })
            .put("/event/MEETING/:id", async (context) => {
                new SessionMiddlewareImpl(
                    new ValidateUserSessionServiceImpl(
                        new FindUserServiceImpl(this.userRepository),
                        new DecodeSessionServiceJWTAdapter(),
                    ),
                ).handle({
                    headers: {
                        Authorization: context.request.headers.get(
                            "Authorization",
                        ),
                    },
                });
                const updateEventService = new UpdateEventServiceImpl(
                    this.repository,
                    new UpdateEventFactoryImpl(),
                    new FindEventServiceImpl(this.repository),
                );
                const updateUserService =
                    new UpdateMeetingEventServiceImpl(
                        new UpdateMeetingEventFactoryImpl(),
                        updateEventService,
                    );
                const updateUserController =
                    new UpdateMeetingEventControllerImpl(
                        updateUserService,
                    );
                const body = await context.request.body({
                    type: "json",
                }).value;
                const params = { id: context.params.id };
                const response = await updateUserController.handle({
                    body,
                    params,
                });
                context.response.body = response.body;
                context.response.status = response.status;
            })
            .put("/event/PARTY/:id", async (context) => {
                new SessionMiddlewareImpl(
                    new ValidateUserSessionServiceImpl(
                        new FindUserServiceImpl(this.userRepository),
                        new DecodeSessionServiceJWTAdapter(),
                    ),
                ).handle({
                    headers: {
                        Authorization: context.request.headers.get(
                            "Authorization",
                        ),
                    },
                });
                const updateEventService = new UpdateEventServiceImpl(
                    this.repository,
                    new UpdateEventFactoryImpl(),
                    new FindEventServiceImpl(this.repository),
                );
                const updateUserService =
                    new UpdatePartyEventServiceImpl(
                        new UpdatePartyEventFactoryImpl(),
                        updateEventService,
                    );
                const updateUserController =
                    new UpdatePartyEventControllerImpl(
                        updateUserService,
                    );
                const body = await context.request.body({
                    type: "json",
                }).value;
                const params = { id: context.params.id };
                const response = await updateUserController.handle({
                    body,
                    params,
                });
                context.response.body = response.body;
                context.response.status = response.status;
            });
        //.delete("/event/:id", async (context) => {
        //    await eventControllerAdapter.getEvent(context);
        //});
    }
}
