use super::{error::UserErr, model::User, read_by_id::user_r_by_id, repo::UserRepo};

pub fn user_d(repo: &dyn UserRepo, id: String) -> Result<User, UserErr> {
    let old_user = user_r_by_id(repo, &id)?;
    repo.d(&id).map_err(UserErr::DB)?;
    Ok(old_user)
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::domain::{
        database::DBErr,
        schedule::user::{
            read_by_id::UserIdNotFound,
            stub::{user_stub, UserRepoStub},
        },
    };

    #[test]
    fn test_user_d_ok() {
        assert_eq!(user_d(&UserRepoStub::default(), user_stub().id), Ok(user_stub()));
    }

    #[test]
    fn test_user_d_err() {
        assert_eq!(user_d(&UserRepoStub::of_db_err(), user_stub().id), Err(UserErr::DB(DBErr)));
        assert_eq!(
            user_d(&UserRepoStub::of_none(), user_stub().id),
            Err(UserErr::UserIdNotFound(UserIdNotFound))
        );
    }
}
