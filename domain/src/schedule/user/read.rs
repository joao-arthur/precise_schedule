use super::{error::UserErr, model::User, repository::UserRepository, sign_in::UserCredentials};

#[derive(Debug, PartialEq)]
pub struct UserCredentialsNotFoundErr;

#[derive(Debug, PartialEq)]
pub struct UserIdNotFoundErr;

#[derive(Debug, PartialEq)]
pub struct UserInfo {
    pub first_name: String,
    pub birthdate: String,
    pub email: String,
    pub username: String,
}

impl From<User> for UserInfo {
    fn from(user: User) -> Self {
        UserInfo {
            first_name: user.first_name,
            birthdate: user.birthdate,
            email: user.email,
            username: user.username,
        }
    }
}

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

pub async fn user_read_info_by_id<Repo: UserRepository>(
    repository: &Repo,
    id: &str,
) -> Result<UserInfo, UserErr> {
    user_read_by_id(repository, id).await.map(UserInfo::from)
}

mod stub {
    use super::UserInfo;

    pub fn user_info_stub() -> UserInfo {
        UserInfo {
            email: "paul@gmail.com".into(),
            first_name: "Paul McCartney".into(),
            birthdate: "1942-06-18".into(),
            username: "macca".into(),
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        schedule::user::{
            error::UserErr, model::stub::user_stub, read::stub::user_info_stub,
            repository::stub::UserRepositoryStub, sign_in::stub::user_credentials_stub,
        },
    };

    use super::{
        UserCredentialsNotFoundErr, UserIdNotFoundErr, UserInfo, user_read_by_credentials,
        user_read_by_id, user_read_info_by_id,
    };

    #[test]
    fn user_info() {
        assert_eq!(UserInfo::from(user_stub()), user_info_stub());
    }

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

    #[tokio::test]
    async fn user_read_by_id_ok() {
        assert_eq!(
            user_read_by_id(&UserRepositoryStub::of_user(user_stub()), &user_stub().id).await,
            Ok(user_stub())
        );
        assert_eq!(
            user_read_info_by_id(&UserRepositoryStub::of_user(user_stub()), &user_stub().id).await,
            Ok(user_info_stub())
        );
    }

    #[tokio::test]
    async fn user_read_by_id_db_err() {
        assert_eq!(
            user_read_by_id(&UserRepositoryStub::of_db_err(), &user_stub().id).await,
            Err(UserErr::DB(DBErr))
        );
        assert_eq!(
            user_read_info_by_id(&UserRepositoryStub::of_db_err(), &user_stub().id).await,
            Err(UserErr::DB(DBErr))
        );
    }

    #[tokio::test]
    async fn user_read_by_id_user_id_not_found_err() {
        assert_eq!(
            user_read_by_id(&UserRepositoryStub::default(), &user_stub().id).await,
            Err(UserErr::UserIdNotFound(UserIdNotFoundErr))
        );
        assert_eq!(
            user_read_info_by_id(&UserRepositoryStub::default(), &user_stub().id).await,
            Err(UserErr::UserIdNotFound(UserIdNotFoundErr))
        );
    }

    #[tokio::test]
    async fn user_read_info_by_id_ok() {
        assert_eq!(
            user_read_by_id(&UserRepositoryStub::of_user(user_stub()), &user_stub().id).await,
            Ok(user_stub())
        );
        assert_eq!(
            user_read_info_by_id(&UserRepositoryStub::of_user(user_stub()), &user_stub().id).await,
            Ok(user_info_stub())
        );
    }

    #[tokio::test]
    async fn user_read_info_by_id_db_err() {
        assert_eq!(
            user_read_by_id(&UserRepositoryStub::of_db_err(), &user_stub().id).await,
            Err(UserErr::DB(DBErr))
        );
        assert_eq!(
            user_read_info_by_id(&UserRepositoryStub::of_db_err(), &user_stub().id).await,
            Err(UserErr::DB(DBErr))
        );
    }

    #[tokio::test]
    async fn user_read_info_by_id_user_id_not_found_err() {
        assert_eq!(
            user_read_by_id(&UserRepositoryStub::default(), &user_stub().id).await,
            Err(UserErr::UserIdNotFound(UserIdNotFoundErr))
        );
        assert_eq!(
            user_read_info_by_id(&UserRepositoryStub::default(), &user_stub().id).await,
            Err(UserErr::UserIdNotFound(UserIdNotFoundErr))
        );
    }
}
