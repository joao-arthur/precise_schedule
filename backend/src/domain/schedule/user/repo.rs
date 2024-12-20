use crate::domain::database::DBOp;

use super::{
    login::UserCred,
    model::User,
    unique_info::{UserUniqueInfo, UserUniqueInfoCount},
};

pub trait UserRepo {
    fn c(&self, user: &User) -> DBOp<()>;
    fn u(&self, user: &User) -> DBOp<()>;
    fn d(&self, id: &String) -> DBOp<()>;
    fn r_by_cred(&self, cred: &UserCred) -> DBOp<Option<User>>;
    fn r_by_id(&self, id: &str) -> DBOp<Option<User>>;
    fn r_count_unique_info(&self, user_unique_info: &UserUniqueInfo) -> DBOp<UserUniqueInfoCount>;
}
