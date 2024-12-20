use std::cell::RefCell;

use crate::domain::{
    database::DBErr,
    schedule::user::{
        login::UserCred,
        model::User,
        repo::UserRepo,
        unique_info::{UserUniqueInfo, UserUniqueInfoCount},
    },
};

pub struct UserRepoMemory {
    users: RefCell<Vec<User>>,
}

impl Default for UserRepoMemory {
    fn default() -> Self {
        UserRepoMemory { users: RefCell::new(vec![]) }
    }
}

unsafe impl Sync for UserRepoMemory {}

impl UserRepo for UserRepoMemory {
    fn c(&self, user: &User) -> Result<(), DBErr> {
        self.users.borrow_mut().push(user.clone());
        Ok(())
    }

    fn u(&self, user: &User) -> Result<(), DBErr> {
        if let Some(pos) = self.users.borrow().iter().position(|u| u.id == user.id) {
            self.users.borrow_mut()[pos] = user.clone();
        }
        Ok(())
    }

    fn d(&self, id: &String) -> Result<(), DBErr> {
        if let Some(pos) = self.users.borrow().iter().position(|u| u.id == *id) {
            self.users.borrow_mut().swap_remove(pos);
        }
        Ok(())
    }

    fn r_by_cred(&self, cred: &UserCred) -> Result<Option<User>, DBErr> {
        Ok(self
            .users
            .borrow()
            .iter()
            .find(|u| u.username == cred.username && u.password == cred.password)
            .cloned())
    }

    fn r_by_id(&self, id: &str) -> Result<Option<User>, DBErr> {
        Ok(self.users.borrow().iter().find(|u| u.id == id).cloned())
    }

    fn r_count_unique_info(
        &self,
        user_unique_info: &UserUniqueInfo,
    ) -> Result<UserUniqueInfoCount, DBErr> {
        let username_count =
            self.users.borrow().iter().filter(|u| u.username == user_unique_info.username).count();
        let email_count =
            self.users.borrow().iter().filter(|u| u.email == user_unique_info.email).count();
        Ok(UserUniqueInfoCount { username: username_count as u32, email: email_count as u32 })
    }
}

#[cfg(test)]
mod test {
    use crate::domain::schedule::user::stub::{user_after_u_stub, user_cred_stub, user_stub, user_unique_stub_3};

    use super::*;

    fn test_user_repo_vec() {
        let repo = UserRepoMemory::default();

        assert_eq!(repo.r_by_id(&user_stub().id), Ok(None));
        assert_eq!(repo.r_by_cred(&user_cred_stub()), Ok(None));
        assert_eq!(repo.r_count_unique_info(&user_unique_stub_3()), Ok(UserUniqueInfoCount { username: 0, email: 0 }));

        assert_eq!(repo.d(&user_stub().id), Ok(()));
        assert_eq!(repo.u(&user_stub()), Ok(()));
    
        assert_eq!(repo.r_by_id(&user_stub().id), Ok(None));
        assert_eq!(repo.r_by_cred(&user_cred_stub()), Ok(None));
        assert_eq!(repo.r_count_unique_info(&user_unique_stub_3()), Ok(UserUniqueInfoCount { username: 0, email: 0 }));

        assert_eq!(repo.c(&user_stub()), Ok(()));

        assert_eq!(repo.r_by_id(&user_stub().id), Ok(Some(user_stub())));
        assert_eq!(repo.r_by_cred(&user_cred_stub()), Ok(Some(user_stub())));
        assert_eq!(repo.r_count_unique_info(&user_unique_stub_3()), Ok(UserUniqueInfoCount { username: 1, email: 1 }));

        assert_eq!(repo.u(&user_after_u_stub()), Ok(()));

        assert_eq!(repo.r_by_id(&user_stub().id), Ok(Some(user_after_u_stub())));
        assert_eq!(repo.r_by_cred(&user_cred_stub()), Ok(Some(user_after_u_stub())));
        assert_eq!(repo.r_count_unique_info(&user_unique_stub_3()), Ok(UserUniqueInfoCount { username: 0, email: 0 }));

        assert_eq!(repo.d(&user_stub().id), Ok(()));

        assert_eq!(repo.r_by_id(&user_stub().id), Ok(None));
        assert_eq!(repo.r_by_cred(&user_cred_stub()), Ok(None));
        assert_eq!(repo.r_count_unique_info(&user_unique_stub_3()), Ok(UserUniqueInfoCount { username: 0, email: 0 }));
    }
}