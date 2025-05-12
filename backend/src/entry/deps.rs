use std::{ops::Deref, sync::LazyLock};

use domain::{
    generator::{DateTimeGenerator, IdGenerator},
    schedule::user::repository::UserRepository,
    session::{SessionDecodeService, SessionEncodeService},
};

use crate::infra::{
    generator::{DateTimeGeneratorImpl, IdGeneratorUUID4},
    schedule::user::repository::UserRepositoryMemory,
    session::{SessionDecodeServiceJWT, SessionEncodeServiceJWT},
};

static USER_REPOSITORY: LazyLock<UserRepositoryMemory> = LazyLock::new(|| UserRepositoryMemory::default());
static ID_GENERATOR: LazyLock<IdGeneratorUUID4> = LazyLock::new(|| IdGeneratorUUID4);
static DATE_TIME_GENERATOR: LazyLock<DateTimeGeneratorImpl> = LazyLock::new(|| DateTimeGeneratorImpl);
static SESSION_ENCODE_SERVICER_GENERATOR: LazyLock<SessionEncodeServiceJWT> = LazyLock::new(|| SessionEncodeServiceJWT);
static SESSION_DECODE_SERVICER_GENERATOR: LazyLock<SessionDecodeServiceJWT> = LazyLock::new(|| SessionDecodeServiceJWT);

pub fn get_user_repository() -> &'static dyn UserRepository {
    &*USER_REPOSITORY
}

pub fn get_id_generator() -> &'static dyn IdGenerator {
    &*ID_GENERATOR
}

pub fn get_date_time_generator() -> &'static dyn DateTimeGenerator {
    &*DATE_TIME_GENERATOR
}

pub fn get_encode_session_service() -> &'static dyn SessionEncodeService {
    &*SESSION_ENCODE_SERVICER_GENERATOR
}

pub fn get_decode_session_service() -> &'static dyn SessionDecodeService {
    &*SESSION_DECODE_SERVICER_GENERATOR
}
