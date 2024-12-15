use super::{error::UserErr, login::UserCred, model::User, repo::UserRepo};

#[derive(Debug, PartialEq)]
pub struct UserCredNotFound;

pub fn user_r_by_cred(repo: &dyn UserRepo, cred: &UserCred) -> Result<User, UserErr> {
    let user = repo.r_by_cred(cred).map_err(UserErr::DB)?;
    user.ok_or(UserErr::UserCredNotFound(UserCredNotFound))
}

#[cfg(test)]
pub mod test {
    use crate::domain::{
        database::DBErr,
        schedule::user::stub::{user_cred_stub, user_stub, UserRepoStub},
    };

    use super::*;

    #[test]
    fn test_r_by_cred() {
        assert_eq!(
            user_r_by_cred(&UserRepoStub::of_db_err(), &user_cred_stub()),
            Err(UserErr::DB(DBErr))
        );
        assert_eq!(
            user_r_by_cred(&UserRepoStub::of_1(None), &user_cred_stub()),
            Err(UserErr::UserCredNotFound(UserCredNotFound))
        );
        assert_eq!(user_r_by_cred(&UserRepoStub::default(), &user_cred_stub()), Ok(user_stub()));
    }
}
