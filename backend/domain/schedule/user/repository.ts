import type { CreateUserRepository } from "./create/CreateUserRepository.ts";
import type { UpdateUserRepository } from "./update/UpdateUserRepository.ts";
import type { FindUserRepository } from "./find/FindUserRepository.ts";
import type { UniqueInfoRepository } from "./uniqueInfo/UniqueInfoRepository.ts";

export type UserRepository =
    & CreateUserRepository
    & UpdateUserRepository
    & FindUserRepository
    & UniqueInfoRepository;
