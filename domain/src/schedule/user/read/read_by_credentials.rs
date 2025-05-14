use crate::schedule::user::{
    error::{UserCredentialsNotFoundErr, UserErr},
    model::User,
    repository::UserRepository,
    sign_in::UserCredentials,
};

pub async fn user_read_by_credentials<Repo: UserRepository>(
    repository: &Repo,
    credentials: &UserCredentials,
) -> Result<User, UserErr> {
    repository
        .read_by_credentials(credentials)
        .await
        .map_err(UserErr::DB)?
        .ok_or(UserErr::UserCredentialsNotFound(UserCredentialsNotFoundErr))
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        schedule::user::{
            error::{UserCredentialsNotFoundErr, UserErr},
            model::stub::user_stub,
            repository::stub::UserRepositoryStub,
            sign_in::stub::user_credentials_stub,
        },
    };

    use super::user_read_by_credentials;

    #[tokio::test]
    async fn user_read_by_credentials_ok() {
        assert_eq!(
            user_read_by_credentials(
                &UserRepositoryStub::of_user(user_stub()),
                &user_credentials_stub()
            )
            .await,
            Ok(user_stub())
        );
    }

    #[tokio::test]
    async fn user_read_by_credentials_db_err() {
        assert_eq!(
            user_read_by_credentials(&UserRepositoryStub::of_db_err(), &user_credentials_stub())
                .await,
            Err(UserErr::DB(DBErr))
        );
    }

    #[tokio::test]
    async fn user_read_by_credentials_user_credentials_not_found_err() {
        assert_eq!(
            user_read_by_credentials(&UserRepositoryStub::default(), &user_credentials_stub())
                .await,
            Err(UserErr::UserCredentialsNotFound(UserCredentialsNotFoundErr))
        );
    }
}
