use crate::domain::schedule::user::read_by_id::user_r_by_id;

use super::{error::UserErr, model::User, repo::UserRepo};

#[derive(Debug, PartialEq)]
pub struct UserInfo {
    pub first_name: String,
    pub birthdate: String,
    pub email: String,
    pub username: String,
}

impl From<User> for UserInfo {
    fn from(user: User) -> Self {
        UserInfo {
            first_name: user.first_name,
            birthdate: user.birthdate,
            email: user.email,
            username: user.username,
        }
    }
}

pub fn user_r_info_by_id(repo: &dyn UserRepo, id: &String) -> Result<UserInfo, UserErr> {
    let user = user_r_by_id(repo, id)?;
    let user_info = UserInfo::from(user);
    Ok(user_info)
}

#[cfg(test)]
mod test {
    use crate::domain::{
        database::DBErr,
        schedule::user::{
            read_by_id::UserIdNotFound,
            stub::{user_info_stub, user_stub, UserRepoStub},
        },
    };

    use super::*;

    #[test]
    fn test_user_r_info_by_id() {
        assert_eq!(
            user_r_info_by_id(&UserRepoStub::of_db_err(), &user_stub().id),
            Err(UserErr::DB(DBErr))
        );
        assert_eq!(
            user_r_info_by_id(&UserRepoStub::of_1(None), &user_stub().id),
            Err(UserErr::UserIdNotFound(UserIdNotFound))
        );
        assert_eq!(
            user_r_info_by_id(&UserRepoStub::default(), &user_stub().id),
            Ok(user_info_stub())
        );
    }
}
