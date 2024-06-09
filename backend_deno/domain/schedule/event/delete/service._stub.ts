import type { EventDeleteService } from "./service.ts";

export class EventDeleteServiceStub implements EventDeleteService {
    public async del(): Promise<void> {}
}
