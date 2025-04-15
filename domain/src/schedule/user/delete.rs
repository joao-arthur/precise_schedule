use super::{error::UserErr, model::User, read::user_r_by_id, repo::UserRepo};

pub fn user_d(repo: &dyn UserRepo, id: String) -> Result<User, UserErr> {
    let found_user = user_r_by_id(repo, &id)?;
    repo.d(&found_user.id).map_err(UserErr::DB)?;
    Ok(found_user)
}

#[cfg(test)]
mod test {
    use super::user_d;
    use crate::{
        database::DBErr,
        schedule::user::{
            error::UserErr,
            read::UserIdNotFoundErr,
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
        assert_eq!(user_d(&UserRepoStub::of_none(), user_stub().id), Err(UserErr::UserIdNotFound(UserIdNotFoundErr)));
    }
}
