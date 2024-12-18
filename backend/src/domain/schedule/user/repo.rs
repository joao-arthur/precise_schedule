use crate::domain::database::DBErr;

use super::{
    login::UserCred,
    model::User,
    unique_info::{UserUniqueInfo, UserUniqueInfoCount},
};

pub trait UserRepo {
    fn c(&mut self, user: &User) -> Result<(), DBErr>;
    fn u(&mut self, user: &User) -> Result<(), DBErr>;
    fn d(&mut self, id: &String) -> Result<(), DBErr>;
    fn r_by_cred(&mut self, cred: &UserCred) -> Result<Option<User>, DBErr>;
    fn r_by_id(&mut self, id: &str) -> Result<Option<User>, DBErr>;
    fn r_count_unique_info(
        &mut self,
        user_unique_info: &UserUniqueInfo,
    ) -> Result<UserUniqueInfoCount, DBErr>;
}
