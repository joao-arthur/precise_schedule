use super::{create::UserCModel, error::UserErr, model::User, repo::UserRepo, update::UserUModel};

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

impl From<&UserCModel> for UserUniqueInfo {
    fn from(user: &UserCModel) -> Self {
        UserUniqueInfo { username: user.username.clone(), email: user.email.clone() }
    }
}

impl From<&UserUModel> for UserUniqueInfo {
    fn from(user: &UserUModel) -> Self {
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
    let unique_info = repo.r_count_unique_info(&user).map_err(UserErr::DBErr)?;
    let username_err = unique_info.username > 0;
    let email_err = unique_info.email > 0;
    if username_err || email_err {
        return Err(UserErr::UserUniqueInfoFieldErr(UserUniqueInfoFieldErr {
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
    let unique_info = repo.r_count_unique_info(&user).map_err(UserErr::DBErr)?;
    let username_err = user.username != old_user.username && unique_info.username > 0;
    let email_err = user.email != old_user.email && unique_info.email > 0;
    if username_err || email_err {
        return Err(UserErr::UserUniqueInfoFieldErr(UserUniqueInfoFieldErr {
            username: username_err,
            email: email_err,
        }));
    }
    Ok(())
}

#[cfg(test)]
mod test {
    use crate::domain::schedule::user::stub::{
        user_c_stub, user_stub, user_u_stub, user_unique_stub_1, user_unique_stub_2, UserRepoStub,
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
            user_c_unique_info_is_valid(
                &UserRepoStub::of_2(UserUniqueInfoCount { username: 1, email: 0 }),
                &user_unique_stub_1()
            ),
            Err(UserErr::UserUniqueInfoFieldErr(UserUniqueInfoFieldErr {
                username: true,
                email: false,
            })),
        );
        assert_eq!(
            user_c_unique_info_is_valid(
                &UserRepoStub::of_2(UserUniqueInfoCount { username: 0, email: 1 }),
                &user_unique_stub_1()
            ),
            Err(UserErr::UserUniqueInfoFieldErr(UserUniqueInfoFieldErr {
                username: false,
                email: true,
            })),
        );
        assert_eq!(
            user_c_unique_info_is_valid(
                &UserRepoStub::of_2(UserUniqueInfoCount { username: 1, email: 1 }),
                &user_unique_stub_1()
            ),
            Err(UserErr::UserUniqueInfoFieldErr(UserUniqueInfoFieldErr {
                username: true,
                email: true,
            })),
        );
    }

    #[test]
    fn user_u_unique_info_is_valid_ok() {
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
                &UserRepoStub::of_2(UserUniqueInfoCount { username: 1, email: 0 }),
                &user_unique_stub_1(),
                &user_unique_stub_1(),
            ),
            Ok(()),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserRepoStub::of_2(UserUniqueInfoCount { username: 0, email: 1 }),
                &user_unique_stub_1(),
                &user_unique_stub_1(),
            ),
            Ok(()),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserRepoStub::of_2(UserUniqueInfoCount { username: 1, email: 1 }),
                &user_unique_stub_1(),
                &user_unique_stub_1(),
            ),
            Ok(()),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserRepoStub::of_2(UserUniqueInfoCount { username: 2, email: 1 }),
                &user_unique_stub_1(),
                &user_unique_stub_1(),
            ),
            Ok(()),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserRepoStub::of_2(UserUniqueInfoCount { username: 1, email: 2 }),
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
    fn user_u_unique_info_is_valid_err() {
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserRepoStub::of_2(UserUniqueInfoCount { username: 1, email: 0 }),
                &user_unique_stub_2(),
                &user_unique_stub_1(),
            ),
            Err(UserErr::UserUniqueInfoFieldErr(UserUniqueInfoFieldErr {
                username: true,
                email: false,
            })),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserRepoStub::of_2(UserUniqueInfoCount { username: 0, email: 1 }),
                &user_unique_stub_2(),
                &user_unique_stub_1(),
            ),
            Err(UserErr::UserUniqueInfoFieldErr(UserUniqueInfoFieldErr {
                username: false,
                email: true,
            })),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserRepoStub::of_2(UserUniqueInfoCount { username: 1, email: 1 }),
                &user_unique_stub_2(),
                &user_unique_stub_1(),
            ),
            Err(UserErr::UserUniqueInfoFieldErr(UserUniqueInfoFieldErr {
                username: true,
                email: true,
            })),
        );
    }
}
