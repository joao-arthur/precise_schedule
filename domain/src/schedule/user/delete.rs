use crate::session::Session;

use super::{error::UserErr, model::User, read::user_read_by_id, repository::UserRepository};

pub async fn user_delete<Repo: UserRepository>(
    session: &Session,
    repository: &Repo,
) -> Result<User, UserErr> {
    let found_user = user_read_by_id(repository, &session.id).await?;
    repository.delete(&found_user.id).await.map_err(UserErr::DB)?;
    Ok(found_user)
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        schedule::user::{
            error::{UserErr, UserIdNotFoundErr},
            model::User,
            repository::stub::UserRepositoryStub,
        },
        session::{Session, stub::session_stub},
    };

    use super::user_delete;

    #[tokio::test]
    async fn user_delete_ok() {
        let user = User {
            id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
            email: "paul@gmail.com".into(),
            first_name: "Paul McCartney".into(),
            birthdate: "1942-06-18".into(),
            username: "macca".into(),
            password: "asdf!@#123".into(),
            created_at: "2024-03-01T11:26Z".into(),
            updated_at: "2024-07-03T22:49Z".into(),
        };
        let session =
            Session { id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(), username: "macca".into() };
        assert_eq!(
            user_delete(&session, &UserRepositoryStub::of_user(user.clone())).await,
            Ok(user)
        );
    }

    #[tokio::test]
    async fn user_delete_db_err() {
        assert_eq!(
            user_delete(&session_stub(), &UserRepositoryStub::of_db_err()).await,
            Err(UserErr::DB(DBErr))
        );
    }

    #[tokio::test]
    async fn user_delete_user_id_not_found_err() {
        assert_eq!(
            user_delete(&session_stub(), &UserRepositoryStub::of_empty()).await,
            Err(UserErr::UserIdNotFound(UserIdNotFoundErr))
        );
    }
}
