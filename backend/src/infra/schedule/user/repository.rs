use std::cell::RefCell;

use domain::{
    database::DBOp,
    schedule::user::{
        model::{User, UserCredentials},
        repository::UserRepository,
        unique_info::{UserUniqueInfo, UserUniqueInfoCount},
    },
};

pub struct UserRepositoryMemory {
    users: RefCell<Vec<User>>,
}

impl Default for UserRepositoryMemory {
    fn default() -> Self {
        UserRepositoryMemory { users: RefCell::new(vec![]) }
    }
}

unsafe impl Sync for UserRepositoryMemory {}

impl UserRepository for UserRepositoryMemory {
    async fn create(&self, user: &User) -> DBOp<()> {
        self.users.borrow_mut().push(user.clone());
        Ok(())
    }

    async fn update(&self, user: &User) -> DBOp<()> {
        let pos = self.users.borrow().iter().position(|u| u.id == user.id);
        if let Some(pos) = pos {
            self.users.borrow_mut()[pos] = user.clone();
        }
        Ok(())
    }

    async fn delete(&self, id: &str) -> DBOp<()> {
        let pos = self.users.borrow().iter().position(|u| u.id == *id);
        if let Some(pos) = pos {
            self.users.borrow_mut().swap_remove(pos);
        }
        Ok(())
    }

    async fn read_by_credentials(&self, credentials: &UserCredentials) -> DBOp<Option<User>> {
        Ok(self
            .users
            .borrow()
            .iter()
            .find(|u| u.username == credentials.username && u.password == credentials.password)
            .cloned())
    }

    async fn read_by_id(&self, id: &str) -> DBOp<Option<User>> {
        Ok(self.users.borrow().iter().find(|u| u.id == id).cloned())
    }

    async fn read_count_unique_info(
        &self,
        user_unique_info: &UserUniqueInfo,
    ) -> DBOp<UserUniqueInfoCount> {
        let username_count =
            self.users.borrow().iter().filter(|u| u.username == user_unique_info.username).count();
        let email_count =
            self.users.borrow().iter().filter(|u| u.email == user_unique_info.email).count();
        Ok(UserUniqueInfoCount { username: username_count as u32, email: email_count as u32 })
    }
}

#[cfg(test)]
mod test {
    use domain::schedule::user::{
        model::{
            User, UserCredentials,
            stub::{user_credentials_stub, user_stub},
        },
        repository::UserRepository,
        unique_info::{UserUniqueInfo, UserUniqueInfoCount},
    };

    use super::UserRepositoryMemory;

    #[tokio::test]
    async fn test_user_repo_memory() {
        let repository = UserRepositoryMemory::default();

        assert_eq!(repository.read_by_id(&"a6edc906-2f9f-5fb2-a373-efac406f0ef2").await, Ok(None));
        assert_eq!(
            repository
                .read_by_credentials(&UserCredentials {
                    username: "macca".into(),
                    password: "asdf!@#123".into()
                })
                .await,
            Ok(None)
        );
        assert_eq!(
            repository
                .read_count_unique_info(&UserUniqueInfo {
                    email: "paul@gmail.com".into(),
                    username: "macca".into()
                })
                .await,
            Ok(UserUniqueInfoCount { username: 0, email: 0 })
        );

        assert_eq!(repository.delete(&"a6edc906-2f9f-5fb2-a373-efac406f0ef2").await, Ok(()));
        assert_eq!(repository.update(&user_stub()).await, Ok(()));

        assert_eq!(repository.read_by_id(&"a6edc906-2f9f-5fb2-a373-efac406f0ef2").await, Ok(None));
        assert_eq!(
            repository
                .read_by_credentials(&UserCredentials {
                    username: "macca".into(),
                    password: "asdf!@#123".into()
                })
                .await,
            Ok(None)
        );
        assert_eq!(
            repository
                .read_count_unique_info(&UserUniqueInfo {
                    email: "paul@gmail.com".into(),
                    username: "macca".into()
                })
                .await,
            Ok(UserUniqueInfoCount { username: 0, email: 0 })
        );

        assert_eq!(repository.create(&user_stub()).await, Ok(()));

        assert_eq!(
            repository.read_by_id(&"a6edc906-2f9f-5fb2-a373-efac406f0ef2").await,
            Ok(Some(User {
                id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                email: "paul@gmail.com".into(),
                first_name: "Paul McCartney".into(),
                birthdate: "1942-06-18".into(),
                username: "macca".into(),
                password: "asdf!@#123".into(),
                created_at: "2024-03-01T11:26Z".into(),
                updated_at: "2024-07-03T22:49Z".into(),
            }))
        );
        assert_eq!(
            repository.read_by_credentials(&user_credentials_stub()).await,
            Ok(Some(User {
                id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                email: "paul@gmail.com".into(),
                first_name: "Paul McCartney".into(),
                birthdate: "1942-06-18".into(),
                username: "macca".into(),
                password: "asdf!@#123".into(),
                created_at: "2024-03-01T11:26Z".into(),
                updated_at: "2024-07-03T22:49Z".into(),
            }))
        );
        assert_eq!(
            repository
                .read_count_unique_info(&UserUniqueInfo {
                    email: "paul@gmail.com".into(),
                    username: "macca".into()
                })
                .await,
            Ok(UserUniqueInfoCount { username: 1, email: 1 })
        );

        assert_eq!(
            repository
                .update(&User {
                    id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                    email: "john@gmail.com".into(),
                    first_name: "John Lennon".into(),
                    birthdate: "1940-10-09".into(),
                    username: "john_lennon".into(),
                    password: "abcd!@#$4321".into(),
                    created_at: "2024-03-01T11:26Z".into(),
                    updated_at: "2025-09-27T18:02Z".into()
                })
                .await,
            Ok(())
        );

        assert_eq!(
            repository.read_by_id(&"a6edc906-2f9f-5fb2-a373-efac406f0ef2").await,
            Ok(Some(User {
                id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                email: "john@gmail.com".into(),
                first_name: "John Lennon".into(),
                birthdate: "1940-10-09".into(),
                username: "john_lennon".into(),
                password: "abcd!@#$4321".into(),
                created_at: "2024-03-01T11:26Z".into(),
                updated_at: "2025-09-27T18:02Z".into()
            }))
        );
        assert_eq!(
            repository
                .read_by_credentials(&UserCredentials {
                    username: "macca".into(),
                    password: "asdf!@#123".into()
                })
                .await,
            Ok(None)
        );
        assert_eq!(
            repository
                .read_count_unique_info(&UserUniqueInfo {
                    email: "paul@gmail.com".into(),
                    username: "macca".into()
                })
                .await,
            Ok(UserUniqueInfoCount { username: 0, email: 0 })
        );

        assert_eq!(repository.delete(&"a6edc906-2f9f-5fb2-a373-efac406f0ef2").await, Ok(()));

        assert_eq!(repository.read_by_id(&"a6edc906-2f9f-5fb2-a373-efac406f0ef2").await, Ok(None));
        assert_eq!(
            repository
                .read_by_credentials(&UserCredentials {
                    username: "macca".into(),
                    password: "asdf!@#123".into()
                })
                .await,
            Ok(None)
        );
        assert_eq!(
            repository
                .read_count_unique_info(&UserUniqueInfo {
                    email: "paul@gmail.com".into(),
                    username: "macca".into()
                })
                .await,
            Ok(UserUniqueInfoCount { username: 0, email: 0 })
        );
    }
}
