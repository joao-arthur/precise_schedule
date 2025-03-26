use super::{create::UserC, error::UserErr, model::User, repo::UserRepo, update::UserU};

#[derive(Debug, PartialEq)]
pub struct UserUniqueInfo {
    pub username: String,
    pub email: String,
}

impl From<&User> for UserUniqueInfo {
    fn from(user: &User) -> Self {
        UserUniqueInfo { username: user.username.clone(), email: user.email.clone() }
    }
}

impl From<&UserC> for UserUniqueInfo {
    fn from(user: &UserC) -> Self {
        UserUniqueInfo { username: user.username.clone(), email: user.email.clone() }
    }
}

impl From<&UserU> for UserUniqueInfo {
    fn from(user: &UserU) -> Self {
        UserUniqueInfo { username: user.username.clone(), email: user.email.clone() }
    }
}

#[derive(Debug, PartialEq, Clone)]
pub struct UserUniqueInfoCount {
    pub username: u32,
    pub email: u32,
}

#[derive(Debug, PartialEq)]
pub struct UserUniqueInfoFieldErr {
    pub username: bool,
    pub email: bool,
}

pub fn user_c_unique_info_is_valid(
    repo: &dyn UserRepo,
    user: &UserUniqueInfo,
) -> Result<(), UserErr> {
    let unique_info = repo.r_count_unique_info(&user).map_err(UserErr::DB)?;
    let username_err = unique_info.username > 0;
    let email_err = unique_info.email > 0;
    if username_err || email_err {
        return Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr {
            username: username_err,
            email: email_err,
        }));
    }
    Ok(())
}

pub fn user_u_unique_info_is_valid(
    repo: &dyn UserRepo,
    user: &UserUniqueInfo,
    old_user: &UserUniqueInfo,
) -> Result<(), UserErr> {
    if user.username == old_user.username && user.email == old_user.email {
        return Ok(());
    }
    let unique_info = repo.r_count_unique_info(&user).map_err(UserErr::DB)?;
    let username_err = user.username != old_user.username && unique_info.username > 0;
    let email_err = user.email != old_user.email && unique_info.email > 0;
    if username_err || email_err {
        return Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr {
            username: username_err,
            email: email_err,
        }));
    }
    Ok(())
}

#[cfg(test)]
mod test {
    use crate::{
        database::DBErr,
        schedule::user::stub::{
            user_c_stub, user_stub, user_u_stub, user_unique_stub_1, user_unique_stub_2,
            UserRepoStub,
        },
    };

    use super::*;

    #[test]
    fn test_unique_info() {
        assert_eq!(
            UserUniqueInfo::from(&user_stub()),
            UserUniqueInfo {
                username: String::from("paul_mc"),
                email: String::from("paul@gmail.com"),
            }
        );
        assert_eq!(
            UserUniqueInfo::from(&user_c_stub()),
            UserUniqueInfo {
                username: String::from("paul_mc"),
                email: String::from("paul@gmail.com"),
            }
        );
        assert_eq!(
            UserUniqueInfo::from(&user_u_stub()),
            UserUniqueInfo {
                username: String::from("john_lennon"),
                email: String::from("john@gmail.com"),
            }
        )
    }

    #[test]
    fn test_user_c_unique_info_is_valid_ok() {
        assert_eq!(
            user_c_unique_info_is_valid(&UserRepoStub::default(), &user_unique_stub_1()),
            Ok(()),
        );
    }

    #[test]
    fn test_user_c_unique_info_is_valid_err() {
        assert_eq!(
            user_c_unique_info_is_valid(&UserRepoStub::of_db_err(), &user_unique_stub_1()),
            Err(UserErr::DB(DBErr)),
        );
        assert_eq!(
            user_c_unique_info_is_valid(
                &UserRepoStub::of_unique_info(UserUniqueInfoCount { username: 1, email: 0 }),
                &user_unique_stub_1()
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr {
                username: true,
                email: false,
            })),
        );
        assert_eq!(
            user_c_unique_info_is_valid(
                &UserRepoStub::of_unique_info(UserUniqueInfoCount { username: 0, email: 1 }),
                &user_unique_stub_1()
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr {
                username: false,
                email: true,
            })),
        );
        assert_eq!(
            user_c_unique_info_is_valid(
                &UserRepoStub::of_unique_info(UserUniqueInfoCount { username: 1, email: 1 }),
                &user_unique_stub_1()
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr {
                username: true,
                email: true,
            })),
        );
    }

    #[test]
    fn test_user_u_unique_info_is_valid_ok() {
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserRepoStub::default(),
                &user_unique_stub_1(),
                &user_unique_stub_1(),
            ),
            Ok(()),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserRepoStub::of_unique_info(UserUniqueInfoCount { username: 1, email: 0 }),
                &user_unique_stub_1(),
                &user_unique_stub_1(),
            ),
            Ok(()),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserRepoStub::of_unique_info(UserUniqueInfoCount { username: 0, email: 1 }),
                &user_unique_stub_1(),
                &user_unique_stub_1(),
            ),
            Ok(()),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserRepoStub::of_unique_info(UserUniqueInfoCount { username: 1, email: 1 }),
                &user_unique_stub_1(),
                &user_unique_stub_1(),
            ),
            Ok(()),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserRepoStub::of_unique_info(UserUniqueInfoCount { username: 2, email: 1 }),
                &user_unique_stub_1(),
                &user_unique_stub_1(),
            ),
            Ok(()),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserRepoStub::of_unique_info(UserUniqueInfoCount { username: 1, email: 2 }),
                &user_unique_stub_1(),
                &user_unique_stub_1(),
            ),
            Ok(()),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserRepoStub::default(),
                &user_unique_stub_2(),
                &user_unique_stub_1(),
            ),
            Ok(()),
        );
    }

    #[test]
    fn test_user_u_unique_info_is_valid_err() {
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserRepoStub::of_db_err(),
                &user_unique_stub_2(),
                &user_unique_stub_1(),
            ),
            Err(UserErr::DB(DBErr)),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserRepoStub::of_unique_info(UserUniqueInfoCount { username: 1, email: 0 }),
                &user_unique_stub_2(),
                &user_unique_stub_1(),
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr {
                username: true,
                email: false,
            })),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserRepoStub::of_unique_info(UserUniqueInfoCount { username: 0, email: 1 }),
                &user_unique_stub_2(),
                &user_unique_stub_1(),
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr {
                username: false,
                email: true,
            })),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserRepoStub::of_unique_info(UserUniqueInfoCount { username: 1, email: 1 }),
                &user_unique_stub_2(),
                &user_unique_stub_1(),
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr {
                username: true,
                email: true,
            })),
        );
    }
}
