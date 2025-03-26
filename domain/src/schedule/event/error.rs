use araucaria::error::ErrWrap;

use crate::database::DBErr;

use super::read::EventIdNotFoundErr;

#[derive(PartialEq, Debug)]
pub enum EventErr {
    DB(DBErr),
    Schema(ErrWrap),
    EventIdNotFound(EventIdNotFoundErr),
}
