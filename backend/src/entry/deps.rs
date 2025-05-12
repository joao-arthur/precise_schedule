use std::sync::LazyLock;

use crate::infra::{
    generator::{DateTimeGeneratorImpl, IdGeneratorUUID4},
    schedule::user::repository::UserRepositoryMemory,
    session::{SessionDecodeServiceJWT, SessionEncodeServiceJWT},
};

pub static USER_REPOSITORY: LazyLock<UserRepositoryMemory> = LazyLock::new(|| UserRepositoryMemory::default());
pub static ID_GENERATOR: LazyLock<IdGeneratorUUID4> = LazyLock::new(|| IdGeneratorUUID4);
pub static DATE_TIME_GENERATOR: LazyLock<DateTimeGeneratorImpl> = LazyLock::new(|| DateTimeGeneratorImpl);
pub static SESSION_ENCODE_SERVICER_GENERATOR: LazyLock<SessionEncodeServiceJWT> = LazyLock::new(|| SessionEncodeServiceJWT);
pub static SESSION_DECODE_SERVICER_GENERATOR: LazyLock<SessionDecodeServiceJWT> = LazyLock::new(|| SessionDecodeServiceJWT);
