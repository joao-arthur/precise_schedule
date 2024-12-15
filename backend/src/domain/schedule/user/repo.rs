use crate::domain::database::DBErr;

use super::{
    login::UserCred,
    model::User,
    unique_info::{UserUniqueInfo, UserUniqueInfoCount},
};

pub trait UserRepo {
    fn c(&self, user: &User) -> Result<(), DBErr>;
    fn u(&self, user: &User) -> Result<(), DBErr>;
    fn d(&self, id: &String) -> Result<(), DBErr>;
    fn r_by_cred(&self, cred: &UserCred) -> Result<Option<User>, DBErr>;
    fn r_by_id(&self, id: &str) -> Result<Option<User>, DBErr>;
    fn r_count_unique_info(
        &self,
        user_unique_info: &UserUniqueInfo,
    ) -> Result<UserUniqueInfoCount, DBErr>;
}
