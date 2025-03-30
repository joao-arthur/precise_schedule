use araucaria::error::SchemaErr;

use crate::{database::DBErr, session::SessionErr};

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
