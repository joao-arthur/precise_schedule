use std::sync::OnceLock;

use crate::{
    domain::{
        generator::{DateTimeGen, IdGen},
        schedule::user::repo::UserRepo,
        session::SessionService,
        validation::Validator,
    },
    infra::{
        generator::{DateTimeGenImpl, IdGenUUID4},
        schedule::user::repo::UserRepoMemory,
        session::SessionServiceJWT, validation::validator_custom::ValidatorCustom,
    },
};

static USER_REPO: OnceLock<UserRepoMemory> = OnceLock::new();
static ID_GEN: OnceLock<IdGenUUID4> = OnceLock::new();
static DATE_TIME_GEN: OnceLock<DateTimeGenImpl> = OnceLock::new();
static VALIDATOR: OnceLock<ValidatorCustom> = OnceLock::new();
static SESSION_SERVICE: OnceLock<SessionServiceJWT> = OnceLock::new();

pub fn get_user_repo() -> &'static dyn UserRepo {
    USER_REPO.get_or_init(|| UserRepoMemory::default())
}

pub fn get_id_gen() -> &'static dyn IdGen {
    ID_GEN.get_or_init(|| IdGenUUID4)
}

pub fn get_date_time_gen() -> &'static dyn DateTimeGen {
    DATE_TIME_GEN.get_or_init(|| DateTimeGenImpl)
}

pub fn get_validator() -> &'static dyn Validator {
    VALIDATOR.get_or_init(|| ValidatorCustom)
}

pub fn get_session_service() -> &'static dyn SessionService {
    SESSION_SERVICE.get_or_init(|| SessionServiceJWT)
}
