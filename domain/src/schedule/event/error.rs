use crate::{database::DBErr, validation::Schema};

use super::read::EventIdNotFoundErr;

#[derive(PartialEq, Debug)]
pub enum EventErr {
    DB(DBErr),
    Schema(Schema),
    EventIdNotFound(EventIdNotFoundErr),
}
