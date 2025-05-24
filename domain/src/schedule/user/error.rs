use crate::{database::DBErr, session::SessionEncodeErr};

#[derive(Debug, PartialEq)]
pub struct UserUniqueInfoFieldErr {
    pub username: bool,
    pub email: bool,
}

#[derive(Debug, PartialEq)]
pub struct UserIdNotFoundErr;

#[derive(Debug, PartialEq)]
pub struct UserCredentialsNotFoundErr;

#[derive(PartialEq, Debug)]
pub enum UserErr {
    DB(DBErr),
    UserUniqueInfoField(UserUniqueInfoFieldErr),
    UserIdNotFound(UserIdNotFoundErr),
    UserCredentialsNotFound(UserCredentialsNotFoundErr),
    EncodeSession(SessionEncodeErr),
}
