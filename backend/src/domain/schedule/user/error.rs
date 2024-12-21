use crate::domain::{database::DBErr, session::SessionErr, validation::SchemaErr};

use super::{
    read::{UserCredNotFoundErr, UserIdNotFoundErr},
    unique_info::UserUniqueInfoFieldErr,
};

#[derive(PartialEq, Debug)]
pub enum UserErr {
    DB(DBErr),
    Schema(SchemaErr),
    UserUniqueInfoField(UserUniqueInfoFieldErr),
    UserIdNotFound(UserIdNotFoundErr),
    UserCredNotFound(UserCredNotFoundErr),
    Session(SessionErr),
}
