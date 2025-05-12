use super::{error::UserErr, model::User, read::user_read_by_id, repository::UserRepository};

pub fn user_delete<Repo: UserRepository>(repository: &Repo, id: String) -> Result<User, UserErr> {
    let found_user = user_read_by_id(repository, &id)?;
    repository.delete(&found_user.id).map_err(UserErr::DB)?;
    Ok(found_user)
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        schedule::user::{error::UserErr, model::stub::user_stub, read::UserIdNotFoundErr, repository::stub::UserRepositoryStub},
    };

    use super::user_delete;

    #[test]
    fn user_delete_ok() {
        assert_eq!(user_delete(&UserRepositoryStub::of_user(user_stub()), user_stub().id), Ok(user_stub()));
    }

    #[test]
    fn user_delete_db_err() {
        assert_eq!(user_delete(&UserRepositoryStub::of_db_err(), user_stub().id), Err(UserErr::DB(DBErr)));
    }

    #[test]
    fn user_delete_user_id_not_found_err() {
        assert_eq!(user_delete(&UserRepositoryStub::default(), user_stub().id), Err(UserErr::UserIdNotFound(UserIdNotFoundErr)));
    }
}
