use super::{error::UserErr, model::User, read::user_read_by_id, repository::UserRepository};

pub fn user_delete(repository: &dyn UserRepository, id: String) -> Result<User, UserErr> {
    let found_user = user_read_by_id(repository, &id)?;
    repository.delete(&found_user.id).map_err(UserErr::DB)?;
    Ok(found_user)
}

#[cfg(test)]
mod test {
    use super::user_delete;
    
    use crate::{
        database::DBErr,
        schedule::user::{
            error::UserErr,
            read::UserIdNotFoundErr,
            stub::{UserRepositoryStub, user_stub},
        },
    };

    #[test]
    fn test_user_delete_ok() {
        assert_eq!(user_delete(&UserRepositoryStub::default(), user_stub().id), Ok(user_stub()));
    }

    #[test]
    fn test_user_delete_err() {
        assert_eq!(user_delete(&UserRepositoryStub::of_db_err(), user_stub().id), Err(UserErr::DB(DBErr)));
        assert_eq!(user_delete(&UserRepositoryStub::of_none(), user_stub().id), Err(UserErr::UserIdNotFound(UserIdNotFoundErr)));
    }
}
