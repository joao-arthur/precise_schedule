use super::{
    error::UserErr, model::User, read::read_by_id::user_read_by_id, repository::UserRepository,
};

pub async fn user_delete<Repo: UserRepository>(
    repository: &Repo,
    id: &str,
) -> Result<User, UserErr> {
    let found_user = user_read_by_id(repository, id).await?;
    repository.delete(&found_user.id).await.map_err(UserErr::DB)?;
    Ok(found_user)
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        schedule::user::{
            error::{UserErr, UserIdNotFoundErr},
            model::stub::user_stub,
            repository::stub::UserRepositoryStub,
        },
    };

    use super::user_delete;

    #[tokio::test]
    async fn user_delete_ok() {
        assert_eq!(
            user_delete(&UserRepositoryStub::of_user(user_stub()), &user_stub().id).await,
            Ok(user_stub())
        );
    }

    #[tokio::test]
    async fn user_delete_db_err() {
        assert_eq!(
            user_delete(&UserRepositoryStub::of_db_err(), &user_stub().id).await,
            Err(UserErr::DB(DBErr))
        );
    }

    #[tokio::test]
    async fn user_delete_user_id_not_found_err() {
        assert_eq!(
            user_delete(&UserRepositoryStub::default(), &user_stub().id).await,
            Err(UserErr::UserIdNotFound(UserIdNotFoundErr))
        );
    }
}
