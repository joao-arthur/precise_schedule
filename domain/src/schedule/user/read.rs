use super::{error::UserErr, login::UserCredentials, model::User, repository::UserRepository};

#[derive(Debug, PartialEq)]
pub struct UserCredentialsNotFoundErr;

#[derive(Debug, PartialEq)]
pub struct UserIdNotFoundErr;

#[derive(Debug, PartialEq)]
pub struct UserInfo {
    pub first_name: String,
    pub birthdate: String,
    pub email: String,
    pub username: String,
}

impl From<User> for UserInfo {
    fn from(user: User) -> Self {
        UserInfo { first_name: user.first_name, birthdate: user.birthdate, email: user.email, username: user.username }
    }
}

pub fn user_read_by_credentials(repository: &dyn UserRepository, credentials: &UserCredentials) -> Result<User, UserErr> {
    repository.read_by_credentials(credentials).map_err(UserErr::DB)?.ok_or(UserErr::UserCredentialsNotFound(UserCredentialsNotFoundErr))
}

pub fn user_read_by_id(repository: &dyn UserRepository, id: &str) -> Result<User, UserErr> {
    repository.read_by_id(id).map_err(UserErr::DB)?.ok_or(UserErr::UserIdNotFound(UserIdNotFoundErr))
}

pub fn user_read_info_by_id(repository: &dyn UserRepository, id: &str) -> Result<UserInfo, UserErr> {
    user_read_by_id(repository, id).map(UserInfo::from)
}

#[cfg(test)]
mod tests {
    use super::{UserCredentialsNotFoundErr, UserIdNotFoundErr, UserInfo, user_read_by_credentials, user_read_by_id, user_read_info_by_id};
    use crate::{
        database::DBErr,
        schedule::user::{
            error::UserErr,
            stub::{UserRepositoryStub, user_credentials_stub, user_info_stub, user_stub},
        },
    };

    #[test]
    fn user_info() {
        assert_eq!(UserInfo::from(user_stub()), user_info_stub());
    }

    #[test]
    fn user_read_ok() {
        assert_eq!(user_read_by_credentials(&UserRepositoryStub::default(), &user_credentials_stub()), Ok(user_stub()));
        assert_eq!(user_read_by_id(&UserRepositoryStub::default(), &user_stub().id), Ok(user_stub()));
        assert_eq!(user_read_info_by_id(&UserRepositoryStub::default(), &user_stub().id), Ok(user_info_stub()));
    }

    #[test]
    fn user_read_db_err() {
        assert_eq!(user_read_by_credentials(&UserRepositoryStub::of_db_err(), &user_credentials_stub()), Err(UserErr::DB(DBErr)));
        assert_eq!(user_read_by_id(&UserRepositoryStub::of_db_err(), &user_stub().id), Err(UserErr::DB(DBErr)));
        assert_eq!(user_read_info_by_id(&UserRepositoryStub::of_db_err(), &user_stub().id), Err(UserErr::DB(DBErr)));
    }

    #[test]
    fn user_read_not_found() {
        assert_eq!(
            user_read_by_credentials(&UserRepositoryStub::of_none(), &user_credentials_stub()),
            Err(UserErr::UserCredentialsNotFound(UserCredentialsNotFoundErr))
        );
        assert_eq!(user_read_by_id(&UserRepositoryStub::of_none(), &user_stub().id), Err(UserErr::UserIdNotFound(UserIdNotFoundErr)));
        assert_eq!(user_read_info_by_id(&UserRepositoryStub::of_none(), &user_stub().id), Err(UserErr::UserIdNotFound(UserIdNotFoundErr)));
    }
}
