use araucaria::error::SchemaErr;

use crate::database::DBErr;

use super::read::EventIdNotFoundErr;

#[derive(PartialEq, Debug)]
pub enum EventErr {
    DB(DBErr),
    Schema(SchemaErr),
    EventIdNotFound(EventIdNotFoundErr),
}
