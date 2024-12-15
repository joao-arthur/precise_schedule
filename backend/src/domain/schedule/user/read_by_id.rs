use crate::domain::schedule::user::{error::UserErr, model::User, repo::UserRepo};

#[derive(Debug, PartialEq)]
pub struct UserIdNotFound;

pub fn user_r_by_id(repo: &dyn UserRepo, id: &str) -> Result<User, UserErr> {
    let user = repo.r_by_id(id).map_err(UserErr::DBErr)?;
    user.ok_or(UserErr::UserIdNotFound(UserIdNotFound))
}

#[cfg(test)]
pub mod test {
    use crate::domain::{
        database::DBErr,
        schedule::user::stub::{user_stub, UserRepoStub},
    };

    use super::*;

    #[test]
    fn test_r_by_id() {
        assert_eq!(
            user_r_by_id(&UserRepoStub::of_db_err(), &user_stub().id),
            Err(UserErr::DBErr(DBErr))
        );
        assert_eq!(
            user_r_by_id(&UserRepoStub::of_1(None), &user_stub().id),
            Err(UserErr::UserIdNotFound(UserIdNotFound))
        );
        assert_eq!(user_r_by_id(&UserRepoStub::default(), &user_stub().id), Ok(user_stub()));
    }
}
