use std::sync::OnceLock;

use domain::{
    generator::{DateTimeGenerator, IdGenerator},
    schedule::user::repository::UserRepository,
    session::SessionService,
    validation::Validator,
};

use crate::infra::{
    generator::{DateTimeGeneratorImpl, IdGeneratorUUID4},
    schedule::user::repository::UserRepositoryMemory,
    session::SessionServiceJWT,
    validation::ValidatorCustom,
};

static USER_REPO: OnceLock<UserRepositoryMemory> = OnceLock::new();
static ID_GEN: OnceLock<IdGeneratorUUID4> = OnceLock::new();
static DATE_TIME_GEN: OnceLock<DateTimeGeneratorImpl> = OnceLock::new();
static VALIDATOR: OnceLock<ValidatorCustom> = OnceLock::new();
static SESSION_SERVICE: OnceLock<SessionServiceJWT> = OnceLock::new();

pub fn get_user_repository() -> &'static dyn UserRepository {
    USER_REPO.get_or_init(|| UserRepositoryMemory::default())
}

pub fn get_id_gen() -> &'static dyn IdGenerator {
    ID_GEN.get_or_init(|| IdGeneratorUUID4)
}

pub fn get_date_time_gen() -> &'static dyn DateTimeGenerator {
    DATE_TIME_GEN.get_or_init(|| DateTimeGeneratorImpl)
}

pub fn get_validator() -> &'static dyn Validator {
    VALIDATOR.get_or_init(|| ValidatorCustom)
}

pub fn get_session_service() -> &'static dyn SessionService {
    SESSION_SERVICE.get_or_init(|| SessionServiceJWT)
}
