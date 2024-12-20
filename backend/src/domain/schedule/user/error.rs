use crate::domain::{database::DBErr, session::SessionErr, validation::SchemaErr};

use super::{
    read::{UserCredNotFound, UserIdNotFound}, unique_info::UserUniqueInfoFieldErr,
};

#[derive(PartialEq, Debug)]
pub enum UserErr {
    DB(DBErr),
    Schema(SchemaErr),
    UserUniqueInfoField(UserUniqueInfoFieldErr),
    UserIdNotFound(UserIdNotFound),
    UserCredNotFound(UserCredNotFound),
    Session(SessionErr),
}
