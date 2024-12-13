use super::{User, UserCred};
use crate::domain::database::DBErr;
use std::fmt;

#[derive(Debug, PartialEq)]
pub struct UserCredNotFound;

impl fmt::Display for UserCredNotFound {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "The user was not found!")
    }
}

#[derive(Debug, PartialEq)]
pub enum UserRByCredErr {
    UserCredNotFound(UserCredNotFound),
    DBErr(DBErr),
}

pub trait UserRByCredRepo {
    fn r_by_cred(&self, cred: &UserCred) -> Result<Option<User>, DBErr>;
}

fn user_r_by_cred(repo: &dyn UserRByCredRepo, cred: &UserCred) -> Result<User, UserRByCredErr> {
    let user = repo.r_by_cred(cred).map_err(UserRByCredErr::DBErr)?;
    user.ok_or(UserRByCredErr::UserCredNotFound(UserCredNotFound))
}

#[cfg(test)]
pub mod test {
    use super::super::test::{user_cred_stub, user_stub};
    use super::super::User;
    use super::*;

    pub struct UserRByCredRepoStub(Result<Option<User>, DBErr>);

    impl UserRByCredRepo for UserRByCredRepoStub {
        fn r_by_cred(&self, _: &UserCred) -> Result<Option<User>, DBErr> {
            self.0.clone()
        }
    }

    #[test]
    fn test_user_r_by_cred_repo_stub() {
        let user = user_stub();
        let cred = user_cred_stub();
        assert_eq!(UserRByCredRepoStub(Err(DBErr)).r_by_cred(&cred), Err(DBErr));
        assert_eq!(UserRByCredRepoStub(Ok(None)).r_by_cred(&cred), Ok(None));
        assert_eq!(UserRByCredRepoStub(Ok(Some(user.clone()))).r_by_cred(&cred), Ok(Some(user)));
    }

    #[test]
    fn test_r_by_cred() {
        let user = user_stub();
        let cred = user_cred_stub();
        assert_eq!(
            user_r_by_cred(&UserRByCredRepoStub(Err(DBErr)), &cred),
            Err(UserRByCredErr::DBErr(DBErr))
        );
        assert_eq!(
            user_r_by_cred(&UserRByCredRepoStub(Ok(None)), &cred),
            Err(UserRByCredErr::UserCredNotFound(UserCredNotFound))
        );
        assert_eq!(user_r_by_cred(&UserRByCredRepoStub(Ok(Some(user.clone()))), &cred), Ok(user));
    }
}
