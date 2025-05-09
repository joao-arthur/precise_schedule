use super::{error::UserErr, model::User, read::user_read_by_id, repository::UserRepository};

pub fn user_delete(repository: &dyn UserRepository, id: String) -> Result<User, UserErr> {
    let found_user = user_read_by_id(repository, &id)?;
    repository.delete(&found_user.id).map_err(UserErr::DB)?;
    Ok(found_user)
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        schedule::user::{
            UserErr, UserIdNotFoundErr,
            stub::{UserRepositoryStub, user_stub},
        },
    };

    use super::user_delete;

    #[test]
    fn user_delete_ok() {
        assert_eq!(user_delete(&UserRepositoryStub::default(), "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into()), Ok(user_stub()));
    }

    #[test]
    fn user_delete_err() {
        assert_eq!(user_delete(&UserRepositoryStub::of_db_err(), "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into()), Err(UserErr::DB(DBErr)));
        assert_eq!(
            user_delete(&UserRepositoryStub::of_none(), "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into()),
            Err(UserErr::UserIdNotFound(UserIdNotFoundErr))
        );
    }
}
