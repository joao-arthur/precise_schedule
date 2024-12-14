use crate::domain::{
    database::DBErr,
    schedule::user::{
        read_by_cred::UserCredNotFound, read_by_id::UserIdNotFound,
        unique_info::UserUniqueInfoFieldErr,
    },
    validation::SchemaErr,
};

#[derive(PartialEq, Debug)]
pub enum UserErr {
    DBErr(DBErr),
    SchemaErr(SchemaErr),
    UserUniqueInfoFieldErr(UserUniqueInfoFieldErr),
    UserIdNotFound(UserIdNotFound),
    UserCredNotFound(UserCredNotFound),
}
