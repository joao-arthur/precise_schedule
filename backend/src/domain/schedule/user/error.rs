use crate::domain::{database::DBErr, session::SessionErr, validation::SchemaErr};

use super::{
    read_by_cred::UserCredNotFound, read_by_id::UserIdNotFound, unique_info::UserUniqueInfoFieldErr,
};

#[derive(PartialEq, Debug)]
pub enum UserErr {
    DB(DBErr),
    Schema(SchemaErr),
    UserUniqueInfoField(UserUniqueInfoFieldErr),
    UserIdNotFound(UserIdNotFound),
    UserCredNotFound(UserCredNotFound),
    Session(SessionErr)
}
