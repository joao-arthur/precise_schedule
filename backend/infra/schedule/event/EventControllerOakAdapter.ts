import { RouterContext } from "oak/mod.ts";
import { CreateEventModel } from "@ps/domain/schedule/event/create/CreateEventModel.ts";
import { CreateEventServiceImpl } from "@ps/domain_impl/schedule/event/create/CreateEventServiceImpl.ts";
import { UpdateEventServiceImpl } from "@ps/domain_impl/schedule/event/update/UpdateEventServiceImpl.ts";
import { CreateEventFactoryImpl } from "@ps/domain_impl/schedule/event/create/CreateEventFactoryImpl.ts";
import { UpdateEventFactoryImpl } from "@ps/domain_impl/schedule/event/update/UpdateEventFactoryImpl.ts";
import { FindEventServiceImpl } from "@ps/domain_impl/schedule/event/find/FindEventServiceImpl.ts";
import { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import { IdParam } from "@ps/application/http/IdParam.ts";
import { CreateEventControllerImpl } from "@ps/application_impl/schedule/event/create/CreateEventControllerImpl.ts";
import { UpdateEventControllerImpl } from "@ps/application_impl/schedule/event/update/UpdateEventControllerImpl.ts";
import { FindEventControllerImpl } from "@ps/application_impl/schedule/event/find/FindEventControllerImpl.ts";
import { EventRepository } from "@ps/domain/schedule/event/EventRepository.ts";
import { IdGenerator } from "@ps/domain/generation/IdGenerator.ts";
import { Validator } from "@ps/domain/validation/Validator.ts";

type EventContext = RouterContext<
    "/event",
    Record<string | number, string | undefined>,
    Record<string, any>
>;

type EventIdContext = RouterContext<
    "/event/:id",
    {
        id: string;
    } & Record<string | number, string | undefined>,
    Record<string, any>
>;

export class EventControllerOakAdapter {
    constructor(
        private readonly idGenerator: IdGenerator,
        private readonly validator: Validator,
        private readonly repository: EventRepository,
    ) {}

    public async postEvent(context: EventContext): Promise<void> {
        const createEventService = new CreateEventServiceImpl(
            this.repository,
            new CreateEventFactoryImpl(this.idGenerator),
            //this.validator,
        );
        const createEventController = new CreateEventControllerImpl(
            createEventService,
        );
        const body = await context.request.body({ type: "json" })
            .value;
        const response = createEventController.handle(
            { body } as HTTPRequest<CreateEventModel, never>,
        );
        context.response.body = response.body;
        context.response.status = response.status;
    }

    public async putEvent(context: EventIdContext): Promise<void> {
        const updateEventService = new UpdateEventServiceImpl(
            this.repository,
            new UpdateEventFactoryImpl(),
            //this.validator,
        );
        const updateEventController = new UpdateEventControllerImpl(
            updateEventService,
        );
        const body = await context.request.body({ type: "json" })
            .value;
        const params = { id: context.params.id };
        const response = updateEventController.handle({
            body,
            params,
        });
        context.response.body = response.body;
        context.response.status = response.status;
    }

    public async getEvent(context: EventIdContext): Promise<void> {
        const findEventService = new FindEventServiceImpl(
            this.repository,
        );
        const findEventController = new FindEventControllerImpl(
            findEventService,
        );
        const params = { id: context.params.id };
        const response = findEventController.handle(
            { params } as HTTPRequest<never, IdParam<string>>,
        );
        context.response.body = response.body;
        context.response.status = response.status;
    }
}
