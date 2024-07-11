use super::User;
use crate::domain::database::DBErr;
use crate::domain::generator::{DateGen, IdGen};

pub trait UserUniqueInfoRepo {
    fn count_username(&self, username: String) -> Result<i32, DBErr>;
    fn count_email(&self, email: String) -> Result<i32, DBErr>;
}

fn user_c_unique_info_is_valid() -> Result<bool, DBErr> {
    Ok(false)
}

fn user_u_unique_info_is_valid() -> Result<bool, DBErr> {
    Ok(false)
}
