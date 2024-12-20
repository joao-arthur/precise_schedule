use crate::domain::{database::DBErr, validation::SchemaErr};

use super::read::EventIdNotFoundErr;

#[derive(PartialEq, Debug)]
pub enum EventErr {
    DB(DBErr),
    Schema(SchemaErr),
    EventIdNotFound(EventIdNotFoundErr),
}
