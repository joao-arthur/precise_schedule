use crate::database::DBOp;

use super::{
    model::User,
    sign_in::UserCredentials,
    unique_info::{UserUniqueInfo, UserUniqueInfoCount},
};

pub trait UserRepository {
    async fn create(&self, user: &User) -> DBOp<()>;
    async fn update(&self, user: &User) -> DBOp<()>;
    async fn delete(&self, id: &str) -> DBOp<()>;
    async fn read_by_credentials(&self, credentials: &UserCredentials) -> DBOp<Option<User>>;
    async fn read_by_id(&self, id: &str) -> DBOp<Option<User>>;
    async fn read_count_unique_info(
        &self,
        user_unique_info: &UserUniqueInfo,
    ) -> DBOp<UserUniqueInfoCount>;
}

pub mod stub {
    use crate::{
        database::{DBErr, DBOp},
        schedule::user::{
            model::User,
            sign_in::UserCredentials,
            unique_info::{UserUniqueInfo, UserUniqueInfoCount},
        },
    };

    use super::UserRepository;

    pub struct UserRepositoryStub {
        pub err: bool,
        pub user: Option<User>,
        pub user_unique_count: UserUniqueInfoCount,
    }

    impl UserRepository for UserRepositoryStub {
        async fn create(&self, _: &User) -> DBOp<()> {
            if self.err {
                return Err(DBErr);
            }
            Ok(())
        }

        async fn update(&self, _: &User) -> DBOp<()> {
            if self.err {
                return Err(DBErr);
            }
            Ok(())
        }

        async fn delete(&self, _: &str) -> DBOp<()> {
            if self.err {
                return Err(DBErr);
            }
            Ok(())
        }

        async fn read_by_id(&self, _: &str) -> DBOp<Option<User>> {
            if self.err {
                return Err(DBErr);
            }
            Ok(self.user.clone())
        }

        async fn read_by_credentials(&self, _: &UserCredentials) -> DBOp<Option<User>> {
            if self.err {
                return Err(DBErr);
            }
            Ok(self.user.clone())
        }

        async fn read_count_unique_info(&self, _: &UserUniqueInfo) -> DBOp<UserUniqueInfoCount> {
            if self.err {
                return Err(DBErr);
            }
            Ok(self.user_unique_count.clone())
        }
    }

    impl Default for UserRepositoryStub {
        fn default() -> Self {
            UserRepositoryStub {
                err: false,
                user: None,
                user_unique_count: UserUniqueInfoCount { email: 0, username: 0 },
            }
        }
    }

    impl UserRepositoryStub {
        pub fn of_user(user: User) -> Self {
            UserRepositoryStub { user: Some(user), ..Default::default() }
        }

        pub fn of_unique_info_count(user_unique_count: UserUniqueInfoCount) -> Self {
            UserRepositoryStub { user_unique_count, ..Default::default() }
        }

        pub fn of_db_err() -> Self {
            UserRepositoryStub { err: true, ..Default::default() }
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        schedule::user::{
            model::stub::user_stub,
            repository::UserRepository,
            sign_in::stub::user_credentials_stub,
            unique_info::{UserUniqueInfoCount, stub::user_unique_info_stub},
        },
    };

    use super::stub::UserRepositoryStub;

    #[tokio::test]
    async fn user_repo_stub_default() {
        assert_eq!(UserRepositoryStub::default().create(&user_stub()).await, Ok(()));
        assert_eq!(UserRepositoryStub::default().update(&user_stub()).await, Ok(()));
        assert_eq!(UserRepositoryStub::default().delete(&user_stub().id).await, Ok(()));
        assert_eq!(UserRepositoryStub::default().read_by_id(&user_stub().id).await, Ok(None));
        assert_eq!(
            UserRepositoryStub::default().read_by_credentials(&user_credentials_stub()).await,
            Ok(None)
        );
        assert_eq!(
            UserRepositoryStub::default().read_count_unique_info(&user_unique_info_stub()).await,
            Ok(UserUniqueInfoCount { email: 0, username: 0 })
        );
    }

    #[tokio::test]
    async fn user_repo_stub_of_user() {
        assert_eq!(
            UserRepositoryStub::of_user(user_stub()).read_by_id(&user_stub().id).await,
            Ok(Some(user_stub()))
        );
        assert_eq!(
            UserRepositoryStub::of_user(user_stub())
                .read_by_credentials(&user_credentials_stub())
                .await,
            Ok(Some(user_stub()))
        );
    }

    #[tokio::test]
    async fn user_repo_stub_of_bd_err() {
        assert_eq!(UserRepositoryStub::of_db_err().create(&user_stub()).await, Err(DBErr));
        assert_eq!(UserRepositoryStub::of_db_err().update(&user_stub()).await, Err(DBErr));
        assert_eq!(UserRepositoryStub::of_db_err().delete(&user_stub().id).await, Err(DBErr));
        assert_eq!(UserRepositoryStub::of_db_err().read_by_id(&user_stub().id).await, Err(DBErr));
        assert_eq!(
            UserRepositoryStub::of_db_err().read_by_credentials(&user_credentials_stub()).await,
            Err(DBErr)
        );
        assert_eq!(
            UserRepositoryStub::of_db_err().read_count_unique_info(&user_unique_info_stub()).await,
            Err(DBErr)
        );
    }

    #[tokio::test]
    async fn user_repo_stub_of_unique_info() {
        assert_eq!(
            UserRepositoryStub::of_unique_info_count(UserUniqueInfoCount { username: 1, email: 0 })
                .read_count_unique_info(&user_unique_info_stub())
                .await,
            Ok(UserUniqueInfoCount { username: 1, email: 0 })
        );
    }
}
