import type { DeleteEventService } from "@ps/domain/schedule/event/delete/DeleteEventService.ts";

export class DeleteEventServiceMock implements DeleteEventService {
    public async del(): Promise<void> {}
}
