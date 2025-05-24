use std::sync::LazyLock;

use crate::infra::{
    generator::{DateTimeGeneratorImpl, IdGeneratorUUID4},
    session::{ SessionEncodeServiceJWT},
};

pub static ID_GENERATOR: LazyLock<IdGeneratorUUID4> = LazyLock::new(|| IdGeneratorUUID4);
pub static DATE_TIME_GENERATOR: LazyLock<DateTimeGeneratorImpl> =
    LazyLock::new(|| DateTimeGeneratorImpl);
pub static SESSION_ENCODE_SERVICER_GENERATOR: LazyLock<SessionEncodeServiceJWT> =
    LazyLock::new(|| SessionEncodeServiceJWT);
