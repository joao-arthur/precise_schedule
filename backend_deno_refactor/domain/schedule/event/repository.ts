import type { EventCreateRepository } from "./create/repository.ts";
import type { EventUpdateRepository } from "./update/repository.ts";
import type { EventFindRepository } from "./find/repository.ts";
import type { EventDeleteRepository } from "./delete/repository.ts";

export type EventRepository =
    & EventCreateRepository
    & EventUpdateRepository
    & EventFindRepository
    & EventDeleteRepository;
