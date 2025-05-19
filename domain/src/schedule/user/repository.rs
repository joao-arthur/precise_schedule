use crate::database::DBErr;

use super::{
    model::{User, UserCredentials},
    unique_info::{UserUniqueInfo, UserUniqueInfoCount},
};

pub trait UserRepository {
    async fn create(&self, user: &User) -> Result<(), DBErr>;
    async fn update(&self, user: &User) -> Result<(), DBErr>;
    async fn delete(&self, id: &str) -> Result<(), DBErr>;
    async fn read_by_credentials(
        &self,
        credentials: &UserCredentials,
    ) -> Result<Option<User>, DBErr>;
    async fn read_by_id(&self, id: &str) -> Result<Option<User>, DBErr>;
    async fn read_count_unique_info(
        &self,
        user_unique_info: &UserUniqueInfo,
    ) -> Result<UserUniqueInfoCount, DBErr>;
}

pub mod stub {
    use crate::{
        database::DBErr,
        schedule::user::{
            model::{User, UserCredentials},
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
        async fn create(&self, _: &User) -> Result<(), DBErr> {
            if self.err {
                return Err(DBErr);
            }
            Ok(())
        }

        async fn update(&self, _: &User) -> Result<(), DBErr> {
            if self.err {
                return Err(DBErr);
            }
            Ok(())
        }

        async fn delete(&self, _: &str) -> Result<(), DBErr> {
            if self.err {
                return Err(DBErr);
            }
            Ok(())
        }

        async fn read_by_id(&self, _: &str) -> Result<Option<User>, DBErr> {
            if self.err {
                return Err(DBErr);
            }
            Ok(self.user.clone())
        }

        async fn read_by_credentials(&self, _: &UserCredentials) -> Result<Option<User>, DBErr> {
            if self.err {
                return Err(DBErr);
            }
            Ok(self.user.clone())
        }

        async fn read_count_unique_info(
            &self,
            _: &UserUniqueInfo,
        ) -> Result<UserUniqueInfoCount, DBErr> {
            if self.err {
                return Err(DBErr);
            }
            Ok(self.user_unique_count.clone())
        }
    }

    impl UserRepositoryStub {
        pub fn of_empty() -> Self {
            UserRepositoryStub {
                err: false,
                user: None,
                user_unique_count: UserUniqueInfoCount { email: 0, username: 0 },
            }
        }

        pub fn of_user(user: User) -> Self {
            UserRepositoryStub {
                err: false,
                user: Some(user),
                user_unique_count: UserUniqueInfoCount { email: 0, username: 0 },
            }
        }

        pub fn of_unique_info_count(user_unique_count: UserUniqueInfoCount) -> Self {
            UserRepositoryStub { err: false, user: None, user_unique_count }
        }

        pub fn of_db_err() -> Self {
            UserRepositoryStub {
                err: true,
                user: None,
                user_unique_count: UserUniqueInfoCount { email: 0, username: 0 },
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        schedule::user::{
            model::stub::{user_credentials_stub, user_stub},
            repository::UserRepository,
            unique_info::{UserUniqueInfoCount, stub::user_unique_info_stub},
        },
    };

    use super::stub::UserRepositoryStub;

    #[tokio::test]
    async fn user_repository_stub_of_empty() {
        let repo = UserRepositoryStub::of_empty();
        assert_eq!(repo.create(&user_stub()).await, Ok(()));
        assert_eq!(repo.update(&user_stub()).await, Ok(()));
        assert_eq!(repo.delete(&user_stub().id).await, Ok(()));
        assert_eq!(repo.read_by_id(&user_stub().id).await, Ok(None));
        assert_eq!(repo.read_by_credentials(&user_credentials_stub()).await, Ok(None));
        assert_eq!(
            repo.read_count_unique_info(&user_unique_info_stub()).await,
            Ok(UserUniqueInfoCount { email: 0, username: 0 })
        );
    }

    #[tokio::test]
    async fn user_repository_stub_of_user() {
        let repo = UserRepositoryStub::of_user(user_stub());
        assert_eq!(repo.read_by_id(&user_stub().id).await, Ok(Some(user_stub())));
        assert_eq!(repo.read_by_credentials(&user_credentials_stub()).await, Ok(Some(user_stub())));
    }

    #[tokio::test]
    async fn user_repository_stub_of_bd_err() {
        let repo = UserRepositoryStub::of_db_err();
        assert_eq!(repo.create(&user_stub()).await, Err(DBErr));
        assert_eq!(repo.update(&user_stub()).await, Err(DBErr));
        assert_eq!(repo.delete(&user_stub().id).await, Err(DBErr));
        assert_eq!(repo.read_by_id(&user_stub().id).await, Err(DBErr));
        assert_eq!(repo.read_by_credentials(&user_credentials_stub()).await, Err(DBErr));
        assert_eq!(repo.read_count_unique_info(&user_unique_info_stub()).await, Err(DBErr));
    }

    #[tokio::test]
    async fn user_repo_stub_of_unique_info() {
        let repo =
            UserRepositoryStub::of_unique_info_count(UserUniqueInfoCount { username: 1, email: 0 });
        assert_eq!(
            repo.read_count_unique_info(&user_unique_info_stub()).await,
            Ok(UserUniqueInfoCount { username: 1, email: 0 })
        );
    }
}
