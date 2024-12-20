use crate::domain::{database::DBErr, validation::SchemaErr};

use super::read_by_id::EventIdNotFoundErr;

#[derive(PartialEq, Debug)]
pub enum EventErr {
    DB(DBErr),
    Schema(SchemaErr),
    EventIdNotFound(EventIdNotFoundErr),
}
