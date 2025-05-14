use crate::database::DBErr;

#[derive(Debug, PartialEq)]
pub struct EventIdNotFoundErr;

#[derive(PartialEq, Debug)]
pub enum EventErr {
    DB(DBErr),
    EventIdNotFound(EventIdNotFoundErr),
}
