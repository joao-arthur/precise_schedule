import type { CreateEventRepository } from "./create/CreateEventRepository.ts";
import type { UpdateEventRepository } from "./update/UpdateEventRepository.ts";
import type { FindEventRepository } from "./find/FindEventRepository.ts";
import type { DeleteEventRepository } from "./delete/DeleteEventRepository.ts";

export type EventRepository =
    & CreateEventRepository
    & UpdateEventRepository
    & FindEventRepository
    & DeleteEventRepository;
