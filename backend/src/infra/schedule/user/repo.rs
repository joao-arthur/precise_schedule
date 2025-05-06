use std::cell::RefCell;

use domain::{
    database::DBOp,
    schedule::user::{
        login::UserCredentials,
        model::User,
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
    fn create(&self, user: &User) -> DBOp<()> {
        self.users.borrow_mut().push(user.clone());
        Ok(())
    }

    fn update(&self, user: &User) -> DBOp<()> {
        let pos = self.users.borrow().iter().position(|u| u.id == user.id);
        if let Some(pos) = pos {
            self.users.borrow_mut()[pos] = user.clone();
        }
        Ok(())
    }

    fn delete(&self, id: &str) -> DBOp<()> {
        let pos = self.users.borrow().iter().position(|u| u.id == *id);
        if let Some(pos) = pos {
            self.users.borrow_mut().swap_remove(pos);
        }
        Ok(())
    }

    fn read_by_credentials(&self, credentials: &UserCredentials) -> DBOp<Option<User>> {
        Ok(self.users.borrow().iter().find(|u| u.username == credentials.username && u.password == credentials.password).cloned())
    }

    fn read_by_id(&self, id: &str) -> DBOp<Option<User>> {
        Ok(self.users.borrow().iter().find(|u| u.id == id).cloned())
    }

    fn read_count_unique_info(&self, user_unique_info: &UserUniqueInfo) -> DBOp<UserUniqueInfoCount> {
        let username_count = self.users.borrow().iter().filter(|u| u.username == user_unique_info.username).count();
        let email_count = self.users.borrow().iter().filter(|u| u.email == user_unique_info.email).count();
        Ok(UserUniqueInfoCount { username: username_count as u32, email: email_count as u32 })
    }
}

#[cfg(test)]
mod test {
    use domain::schedule::user::{
        repository::UserRepository,
        stub::{user_after_update_stub, user_credentials_stub, user_stub, user_unique_info_stub_3},
        unique_info::UserUniqueInfoCount,
    };

    use super::UserRepositoryMemory;

    #[test]
    fn test_user_repo_memory() {
        let repo = UserRepositoryMemory::default();

        assert_eq!(repo.read_by_id(&user_stub().id), Ok(None));
        assert_eq!(repo.read_by_credentials(&user_credentials_stub()), Ok(None));
        assert_eq!(repo.read_count_unique_info(&user_unique_info_stub_3()), Ok(UserUniqueInfoCount { username: 0, email: 0 }));

        assert_eq!(repo.delete(&user_stub().id), Ok(()));
        assert_eq!(repo.update(&user_stub()), Ok(()));

        assert_eq!(repo.read_by_id(&user_stub().id), Ok(None));
        assert_eq!(repo.read_by_credentials(&user_credentials_stub()), Ok(None));
        assert_eq!(repo.read_count_unique_info(&user_unique_info_stub_3()), Ok(UserUniqueInfoCount { username: 0, email: 0 }));

        assert_eq!(repo.create(&user_stub()), Ok(()));

        assert_eq!(repo.read_by_id(&user_stub().id), Ok(Some(user_stub())));
        assert_eq!(repo.read_by_credentials(&user_credentials_stub()), Ok(Some(user_stub())));
        assert_eq!(repo.read_count_unique_info(&user_unique_info_stub_3()), Ok(UserUniqueInfoCount { username: 1, email: 1 }));

        assert_eq!(repo.update(&user_after_update_stub()), Ok(()));

        assert_eq!(repo.read_by_id(&user_stub().id), Ok(Some(user_after_update_stub())));
        assert_eq!(repo.read_by_credentials(&user_credentials_stub()), Ok(None));
        assert_eq!(repo.read_count_unique_info(&user_unique_info_stub_3()), Ok(UserUniqueInfoCount { username: 0, email: 0 }));

        assert_eq!(repo.delete(&user_stub().id), Ok(()));

        assert_eq!(repo.read_by_id(&user_stub().id), Ok(None));
        assert_eq!(repo.read_by_credentials(&user_credentials_stub()), Ok(None));
        assert_eq!(repo.read_count_unique_info(&user_unique_info_stub_3()), Ok(UserUniqueInfoCount { username: 0, email: 0 }));
    }
}
