import type { UserCreateRepository } from "./create/repository.ts";
import type { UserUpdateRepository } from "./update/repository.ts";
import type { UserFindRepository } from "./find/repository.ts";
import type { UserUniqueInfoRepository } from "./uniqueInfo/repository.ts";

export type UserRepository =
    & UserCreateRepository
    & UserUpdateRepository
    & UserFindRepository
    & UserUniqueInfoRepository;
