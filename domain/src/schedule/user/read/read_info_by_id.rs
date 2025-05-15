use crate::schedule::user::{error::UserErr, model::UserInfo, repository::UserRepository};

use super::read_by_id::user_read_by_id;

pub async fn user_read_info_by_id<Repo: UserRepository>(
    repository: &Repo,
    id: &str,
) -> Result<UserInfo, UserErr> {
    user_read_by_id(repository, id).await.map(UserInfo::from)
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        schedule::user::{
            error::{UserErr, UserIdNotFoundErr},
            model::stub::{user_info_stub, user_stub},
            repository::stub::UserRepositoryStub,
        },
    };

    use super::user_read_info_by_id;

    #[tokio::test]
    async fn user_read_info_by_id_ok() {
        assert_eq!(
            user_read_info_by_id(&UserRepositoryStub::of_user(user_stub()), &user_stub().id).await,
            Ok(user_info_stub())
        );
    }

    #[tokio::test]
    async fn user_read_info_by_id_db_err() {
        assert_eq!(
            user_read_info_by_id(&UserRepositoryStub::of_db_err(), &user_stub().id).await,
            Err(UserErr::DB(DBErr))
        );
    }

    #[tokio::test]
    async fn user_read_info_by_id_user_id_not_found_err() {
        assert_eq!(
            user_read_info_by_id(&UserRepositoryStub::of_empty(), &user_stub().id).await,
            Err(UserErr::UserIdNotFound(UserIdNotFoundErr))
        );
    }
}
