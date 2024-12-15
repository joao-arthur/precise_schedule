use crate::domain::{
    database::DBErr,
    validation::SchemaErr,
};

use super::{
    read_by_cred::UserCredNotFound, read_by_id::UserIdNotFound,
    unique_info::UserUniqueInfoFieldErr,
};

#[derive(PartialEq, Debug)]
pub enum UserErr {
    DBErr(DBErr),
    SchemaErr(SchemaErr),
    UserUniqueInfoFieldErr(UserUniqueInfoFieldErr),
    UserIdNotFound(UserIdNotFound),
    UserCredNotFound(UserCredNotFound),
}
