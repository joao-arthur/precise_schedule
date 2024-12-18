use crate::domain::{database::DBErr, schedule::user::{login::UserCred, model::User, repo::UserRepo, unique_info::{UserUniqueInfo, UserUniqueInfoCount}}};

pub struct UserRepoVec {
    users: Vec<User>
}

impl Default for UserRepoVec {
    fn default() -> Self {
        UserRepoVec { users: vec![] }
    }
}

unsafe impl Sync for UserRepoVec {}

impl UserRepo for UserRepoVec {
    fn c(&mut self, user: &User) -> Result<(), DBErr> {
        self.users.push(user.clone());
        Ok(())
    }

    fn u(&mut self, user: &User) -> Result<(), DBErr> {
        if let Some(pos) = self.users.iter().position(|u| u.id == user.id) {
            self.users[pos] = user.clone();
        }
        Ok(())
    }

    fn d(&mut self, id: &String) -> Result<(), DBErr> {
        if let Some(pos) = self.users.iter().position(|u| u.id == *id) {
            self.users.swap_remove(pos);
        }
        Ok(())
    }

    fn r_by_cred(&mut self, cred: &UserCred) -> Result<Option<User>, DBErr> {
        Ok(self.users.iter().find(|u| u.username == cred.username && u.password == cred.password).cloned())
    }

    fn r_by_id(&mut self, id: &str) -> Result<Option<User>, DBErr> {
        Ok(self.users.iter().find(|u| u.id == id).cloned())
    }

    fn r_count_unique_info(
        &mut self,
        user_unique_info: &UserUniqueInfo,
    ) -> Result<UserUniqueInfoCount, DBErr> {
        let username_count = self.users.iter().filter(|u| u.username == user_unique_info.username).count();
        let email_count = self.users.iter().filter(|u| u.email == user_unique_info.email).count();
        Ok(UserUniqueInfoCount {
            username: username_count as u32,
            email: email_count as u32
        })
    }
}