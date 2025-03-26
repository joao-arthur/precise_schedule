use crate::{database::DBErr, session::SessionErr, validation::Schema};

use super::{
    read::{UserCredNotFoundErr, UserIdNotFoundErr},
    unique_info::UserUniqueInfoFieldErr,
};

#[derive(PartialEq, Debug)]
pub enum UserErr {
    DB(DBErr),
    Schema(Schema),
    UserUniqueInfoField(UserUniqueInfoFieldErr),
    UserIdNotFound(UserIdNotFoundErr),
    UserCredNotFound(UserCredNotFoundErr),
    Session(SessionErr),
}
