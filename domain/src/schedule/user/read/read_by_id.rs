use crate::schedule::user::{
    error::{UserErr, UserIdNotFoundErr},
    model::User,
    repository::UserRepository,
};

pub async fn user_read_by_id<Repo: UserRepository>(
    repository: &Repo,
    id: &str,
) -> Result<User, UserErr> {
    repository
        .read_by_id(id)
        .await
        .map_err(UserErr::DB)?
        .ok_or(UserErr::UserIdNotFound(UserIdNotFoundErr))
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

    use super::user_read_by_id;

    #[tokio::test]
    async fn user_read_by_id_ok() {
        assert_eq!(
            user_read_by_id(&UserRepositoryStub::of_user(user_stub()), &user_stub().id).await,
            Ok(user_stub())
        );
    }

    #[tokio::test]
    async fn user_read_by_id_db_err() {
        assert_eq!(
            user_read_by_id(&UserRepositoryStub::of_db_err(), &user_stub().id).await,
            Err(UserErr::DB(DBErr))
        );
    }

    #[tokio::test]
    async fn user_read_by_id_user_id_not_found_err() {
        assert_eq!(
            user_read_by_id(&UserRepositoryStub::default(), &user_stub().id).await,
            Err(UserErr::UserIdNotFound(UserIdNotFoundErr))
        );
    }
}
