use super::{error::UserErr, model::User, read_by_id::user_r_by_id, repo::UserRepo};

pub fn user_d(
    repo: &dyn UserRepo,
    id: String,
) -> Result<User, UserErr> {
    let old_user = user_r_by_id(repo, &id)?;
    repo.d(&id).map_err(UserErr::DBErr)?;
    Ok(old_user)
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::domain::{
        database::DBErr,
        schedule::user::{read_by_id::UserIdNotFound, stub::{user_stub, UserRepoStub}},
    };

    #[test]
    fn test_user_u_ok() {
        assert_eq!(
            user_d(&UserRepoStub::default(), user_stub().id),
            Ok(user_stub())
        );
    }

    #[test]
    fn test_user_u_err() {
        assert_eq!(
            user_d(&UserRepoStub::of_db_err(), user_stub().id),
            Err(UserErr::DBErr(DBErr))
        );
        assert_eq!(
            user_d(&UserRepoStub::of_1(None), user_stub().id),
            Err(UserErr::UserIdNotFound(UserIdNotFound))
        );
    }
}
