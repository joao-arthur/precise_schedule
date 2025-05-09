use crate::database::DBOp;

use super::{
    model::User,
    sign_in::UserCredentials,
    unique_info::{UserUniqueInfo, UserUniqueInfoCount},
};

pub trait UserRepository {
    fn create(&self, user: &User) -> DBOp<()>;
    fn update(&self, user: &User) -> DBOp<()>;
    fn delete(&self, id: &str) -> DBOp<()>;
    fn read_by_credentials(&self, credentials: &UserCredentials) -> DBOp<Option<User>>;
    fn read_by_id(&self, id: &str) -> DBOp<Option<User>>;
    fn read_count_unique_info(&self, user_unique_info: &UserUniqueInfo) -> DBOp<UserUniqueInfoCount>;
}
