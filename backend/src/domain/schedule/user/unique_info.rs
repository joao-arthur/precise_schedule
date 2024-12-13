use crate::domain::database::DBErr;

pub struct UserUniqueInfo {
    pub email: String,
    pub username: String,
}

#[derive(Clone)]
pub struct UserUniqueInfoCount {
    pub email: u32,
    pub username: u32,
}

#[derive(Debug, PartialEq)]
pub struct UserUniqueInfoFieldErr {
    pub email: bool,
    pub username: bool,
}

#[derive(PartialEq, Debug)]
pub enum UserUniqueInfoErr {
    DBErr(DBErr),
    UserUniqueInfoFieldErr(UserUniqueInfoFieldErr),
}

pub trait UserUniqueInfoRepo {
    fn count_unique_info(
        &self,
        user_unique_info: &UserUniqueInfo,
    ) -> Result<UserUniqueInfoCount, DBErr>;
}

pub fn user_c_unique_info_is_valid(
    repo: &dyn UserUniqueInfoRepo,
    user: &UserUniqueInfo,
) -> Result<(), UserUniqueInfoErr> {
    let unique_info = repo.count_unique_info(&user).map_err(|err| UserUniqueInfoErr::DBErr(err))?;
    let username_err = unique_info.username > 0;
    let email_err = unique_info.email > 0;
    if username_err || email_err {
        return Err(UserUniqueInfoErr::UserUniqueInfoFieldErr(UserUniqueInfoFieldErr {
            username: username_err,
            email: email_err,
        }));
    }
    Ok(())
}

pub fn user_u_unique_info_is_valid(
    repo: &dyn UserUniqueInfoRepo,
    user: &UserUniqueInfo,
    old_user: &UserUniqueInfo,
) -> Result<(), UserUniqueInfoErr> {
    if user.username == old_user.username && user.email == old_user.email {
        return Ok(());
    }
    let unique_info = repo.count_unique_info(&user).map_err(|err| UserUniqueInfoErr::DBErr(err))?;
    let username_err = user.username != old_user.username && unique_info.username > 0;
    let email_err = user.email != old_user.email && unique_info.email > 0;
    if username_err || email_err {
        return Err(UserUniqueInfoErr::UserUniqueInfoFieldErr(UserUniqueInfoFieldErr {
            username: username_err,
            email: email_err,
        }));
    }
    Ok(())
}

#[cfg(test)]
mod test {
    use super::*;

    pub struct UserUniqueInfoRepoStub(pub Result<UserUniqueInfoCount, DBErr>);

    impl UserUniqueInfoRepo for UserUniqueInfoRepoStub {
        fn count_unique_info(&self, _: &UserUniqueInfo) -> Result<UserUniqueInfoCount, DBErr> {
            self.0.clone()
        }
    }

    fn user_unique_stub_1() -> UserUniqueInfo {
        UserUniqueInfo { username: String::from("john123"), email: String::from("john@gmail.com") }
    }

    fn user_unique_stub_2() -> UserUniqueInfo {
        UserUniqueInfo {
            username: String::from("peter987"),
            email: String::from("peter@gmail.com"),
        }
    }

    #[test]
    fn test_user_c_unique_info_is_valid_ok() {
        assert_eq!(
            user_c_unique_info_is_valid(
                &UserUniqueInfoRepoStub(Ok(UserUniqueInfoCount { username: 0, email: 0 })),
                &user_unique_stub_1()
            ),
            Ok(()),
        );
    }

    #[test]
    fn test_user_c_unique_info_is_valid_err() {
        assert_eq!(
            user_c_unique_info_is_valid(
                &UserUniqueInfoRepoStub(Ok(UserUniqueInfoCount { username: 1, email: 0 })),
                &user_unique_stub_1()
            ),
            Err(UserUniqueInfoErr::UserUniqueInfoFieldErr(UserUniqueInfoFieldErr {
                username: true,
                email: false,
            })),
        );
        assert_eq!(
            user_c_unique_info_is_valid(
                &UserUniqueInfoRepoStub(Ok(UserUniqueInfoCount { username: 0, email: 1 })),
                &user_unique_stub_1()
            ),
            Err(UserUniqueInfoErr::UserUniqueInfoFieldErr(UserUniqueInfoFieldErr {
                username: false,
                email: true,
            })),
        );
        assert_eq!(
            user_c_unique_info_is_valid(
                &UserUniqueInfoRepoStub(Ok(UserUniqueInfoCount { username: 1, email: 1 })),
                &user_unique_stub_1()
            ),
            Err(UserUniqueInfoErr::UserUniqueInfoFieldErr(UserUniqueInfoFieldErr {
                username: true,
                email: true,
            })),
        );
    }

    #[test]
    fn user_u_unique_info_is_valid_ok() {
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserUniqueInfoRepoStub(Ok(UserUniqueInfoCount { username: 0, email: 0 })),
                &user_unique_stub_1(),
                &user_unique_stub_1(),
            ),
            Ok(()),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserUniqueInfoRepoStub(Ok(UserUniqueInfoCount { username: 1, email: 0 })),
                &user_unique_stub_1(),
                &user_unique_stub_1(),
            ),
            Ok(()),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserUniqueInfoRepoStub(Ok(UserUniqueInfoCount { username: 0, email: 1 })),
                &user_unique_stub_1(),
                &user_unique_stub_1(),
            ),
            Ok(()),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserUniqueInfoRepoStub(Ok(UserUniqueInfoCount { username: 1, email: 1 })),
                &user_unique_stub_1(),
                &user_unique_stub_1(),
            ),
            Ok(()),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserUniqueInfoRepoStub(Ok(UserUniqueInfoCount { username: 2, email: 1 })),
                &user_unique_stub_1(),
                &user_unique_stub_1(),
            ),
            Ok(()),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserUniqueInfoRepoStub(Ok(UserUniqueInfoCount { username: 1, email: 2 })),
                &user_unique_stub_1(),
                &user_unique_stub_1(),
            ),
            Ok(()),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserUniqueInfoRepoStub(Ok(UserUniqueInfoCount { username: 0, email: 0 })),
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
                &UserUniqueInfoRepoStub(Ok(UserUniqueInfoCount { username: 1, email: 0 })),
                &user_unique_stub_2(),
                &user_unique_stub_1(),
            ),
            Err(UserUniqueInfoErr::UserUniqueInfoFieldErr(UserUniqueInfoFieldErr {
                username: true,
                email: false,
            })),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserUniqueInfoRepoStub(Ok(UserUniqueInfoCount { username: 0, email: 1 })),
                &user_unique_stub_2(),
                &user_unique_stub_1(),
            ),
            Err(UserUniqueInfoErr::UserUniqueInfoFieldErr(UserUniqueInfoFieldErr {
                username: false,
                email: true,
            })),
        );
        assert_eq!(
            user_u_unique_info_is_valid(
                &UserUniqueInfoRepoStub(Ok(UserUniqueInfoCount { username: 1, email: 1 })),
                &user_unique_stub_2(),
                &user_unique_stub_1(),
            ),
            Err(UserUniqueInfoErr::UserUniqueInfoFieldErr(UserUniqueInfoFieldErr {
                username: true,
                email: true,
            })),
        );
    }
}
