use super::{error::UserErr, login::UserCred, model::User, repo::UserRepo};

#[derive(Debug, PartialEq)]
pub struct UserCredNotFoundErr;

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

pub fn user_r_by_cred(repo: &dyn UserRepo, cred: &UserCred) -> Result<User, UserErr> {
    repo.r_by_cred(cred).map_err(UserErr::DB)?.ok_or(UserErr::UserCredNotFound(UserCredNotFoundErr))
}

pub fn user_r_by_id(repo: &dyn UserRepo, id: &str) -> Result<User, UserErr> {
    repo.r_by_id(id).map_err(UserErr::DB)?.ok_or(UserErr::UserIdNotFound(UserIdNotFoundErr))
}

pub fn user_r_info_by_id(repo: &dyn UserRepo, id: &str) -> Result<UserInfo, UserErr> {
    user_r_by_id(repo, id).map(UserInfo::from)
}

#[cfg(test)]
mod test {
    use super::{user_r_by_cred, user_r_by_id, user_r_info_by_id, UserCredNotFoundErr, UserIdNotFoundErr, UserInfo};
    use crate::{
        database::DBErr,
        schedule::user::{
            error::UserErr,
            stub::{user_cred_stub, user_info_stub, user_stub, UserRepoStub},
        },
    };

    #[test]
    fn test_user_info() {
        assert_eq!(UserInfo::from(user_stub()), user_info_stub());
    }

    #[test]
    fn test_user_r_ok() {
        assert_eq!(user_r_by_cred(&UserRepoStub::default(), &user_cred_stub()), Ok(user_stub()));
        assert_eq!(user_r_by_id(&UserRepoStub::default(), &user_stub().id), Ok(user_stub()));
        assert_eq!(user_r_info_by_id(&UserRepoStub::default(), &user_stub().id), Ok(user_info_stub()));
    }

    #[test]
    fn test_user_r_db_err() {
        assert_eq!(user_r_by_cred(&UserRepoStub::of_db_err(), &user_cred_stub()), Err(UserErr::DB(DBErr)));
        assert_eq!(user_r_by_id(&UserRepoStub::of_db_err(), &user_stub().id), Err(UserErr::DB(DBErr)));
        assert_eq!(user_r_info_by_id(&UserRepoStub::of_db_err(), &user_stub().id), Err(UserErr::DB(DBErr)));
    }

    #[test]
    fn test_user_r_not_found() {
        assert_eq!(user_r_by_cred(&UserRepoStub::of_none(), &user_cred_stub()), Err(UserErr::UserCredNotFound(UserCredNotFoundErr)));
        assert_eq!(user_r_by_id(&UserRepoStub::of_none(), &user_stub().id), Err(UserErr::UserIdNotFound(UserIdNotFoundErr)));
        assert_eq!(user_r_info_by_id(&UserRepoStub::of_none(), &user_stub().id), Err(UserErr::UserIdNotFound(UserIdNotFoundErr)));
    }
}
