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

pub struct UserRepoVec {
    users: RefCell<Vec<User>>,
}

impl Default for UserRepoVec {
    fn default() -> Self {
        UserRepoVec { users: RefCell::new(vec![]) }
    }
}

unsafe impl Sync for UserRepoVec {}

impl UserRepo for UserRepoVec {
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
