import type { User } from "../../user/User.ts";
import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateMeetingEvent } from "@ps/domain/schedule/event/createMeeting/CreateMeetingEvent.ts";

export type CreateMeetingEventService = {
    readonly create: (userId: User["id"], event: CreateMeetingEvent) => Promise<Event>;
};
