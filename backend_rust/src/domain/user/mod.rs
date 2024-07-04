pub mod create;

use super::database::DBErr;

#[derive(Debug, PartialEq)]
pub struct User {
    pub id: String,
    pub first_name: String,
    pub birthdate: String,
    pub email: String,
    pub username: String,
    pub created_at: String,
    pub password: String,
    pub updated_at: String,
}

pub struct UserCred {
    pub username: String,
    pub password: String,
}

pub trait UserRepo {
    fn c(&self, user: &User) -> Result<(), DBErr>;
    fn u(&self, user: &User) -> Result<(), DBErr>;
    fn r_by_id(&self, id: String) -> Result<(), DBErr>;
    fn r_by_cred(&self, cred: &UserCred) -> Result<(), DBErr>;
    fn count_username(&self, username: String) -> Result<i32, DBErr>;
    fn count_email(&self, email: String) -> Result<i32, DBErr>;
}

#[cfg(test)]
pub mod test {
    use super::*;

    pub struct IdGenStub(pub String);

    impl IdGen for IdGenStub {
        fn gen(&self) -> String {
            self.0.clone()
        }
    }
}
