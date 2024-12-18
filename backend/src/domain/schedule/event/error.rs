use crate::domain::{database::DBErr, validation::SchemaErr};

#[derive(PartialEq, Debug)]
pub enum EventErr {
    DB(DBErr),
    Schema(SchemaErr),
    // EventIdNotFound(EventIdNotFoundErr),
}
