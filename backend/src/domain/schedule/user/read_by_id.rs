use super::User;
use crate::domain::database::DBErr;
use std::fmt;

#[derive(Debug, PartialEq)]
pub struct UserIdNotFound;

impl fmt::Display for UserIdNotFound {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "The user was not found!")
    }
}

#[derive(Debug, PartialEq)]
pub enum UserRByIdErr {
    UserIdNotFound(UserIdNotFound),
    DBErr(DBErr),
}

pub trait UserRByIdRepo {
    fn r_by_id(&self, id: &str) -> Result<Option<User>, DBErr>;
}

pub trait UserRByIdService {
    fn r_by_id(&self, id: &str) -> Result<User, UserRByIdErr>;
}

fn user_r_by_id(repo: &dyn UserRByIdRepo, id: &str) -> Result<User, UserRByIdErr> {
    let user = repo.r_by_id(id).map_err(UserRByIdErr::DBErr)?;
    user.ok_or(UserRByIdErr::UserIdNotFound(UserIdNotFound))
}

pub struct UserRByIdServiceImpl<'a> {
    repo: &'a dyn UserRByIdRepo,
}

impl UserRByIdService for UserRByIdServiceImpl<'_> {
    fn r_by_id(&self, id: &str) -> Result<User, UserRByIdErr> {
        user_r_by_id(self.repo, id)
    }
}

#[cfg(test)]
pub mod test {
    use super::super::test::user_stub;
    use super::super::User;
    use super::*;

    pub struct UserRByIdRepoStub(Result<Option<User>, DBErr>);

    impl UserRByIdRepo for UserRByIdRepoStub {
        fn r_by_id(&self, _: &str) -> Result<Option<User>, DBErr> {
            self.0.clone()
        }
    }

    #[test]
    fn test_user_r_by_id_repo_stub() {
        let user = user_stub();
        assert_eq!(UserRByIdRepoStub(Err(DBErr)).r_by_id(&user.id), Err(DBErr));
        assert_eq!(UserRByIdRepoStub(Ok(None)).r_by_id(&user.id), Ok(None));
        assert_eq!(
            UserRByIdRepoStub(Ok(Some(user.clone()))).r_by_id(&user.id),
            Ok(Some(user))
        );
    }

    #[test]
    fn test_r_by_id() {
        let user = user_stub();
        assert_eq!(
            user_r_by_id(&UserRByIdRepoStub(Err(DBErr)), &user.id),
            Err(UserRByIdErr::DBErr(DBErr))
        );
        assert_eq!(
            user_r_by_id(&UserRByIdRepoStub(Ok(None)), &user.id),
            Err(UserRByIdErr::UserIdNotFound(UserIdNotFound))
        );
        assert_eq!(
            user_r_by_id(&UserRByIdRepoStub(Ok(Some(user.clone()))), &user.id),
            Ok(user)
        );
    }
}
