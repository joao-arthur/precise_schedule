use araucaria::error::SchemaErr;

use crate::{database::DBErr, session::SessionErr};

use super::{
    read::{UserCredentialsNotFoundErr, UserIdNotFoundErr},
    unique_info::UserUniqueInfoFieldErr,
};

#[derive(PartialEq, Debug)]
pub enum UserErr {
    DB(DBErr),
    Schema(SchemaErr),
    UserUniqueInfoField(UserUniqueInfoFieldErr),
    UserIdNotFound(UserIdNotFoundErr),
    UserCredentialsNotFound(UserCredentialsNotFoundErr),
    Session(SessionErr),
}
