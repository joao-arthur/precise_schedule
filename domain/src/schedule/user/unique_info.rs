use super::{error::UserErr, model::User, repository::UserRepository, sign_up::UserSignUpInput, update::UserUpdateInput};

#[derive(Debug, PartialEq)]
pub struct UserUniqueInfo {
    pub username: String,
    pub email: String,
}

impl From<&User> for UserUniqueInfo {
    fn from(model: &User) -> Self {
        UserUniqueInfo { username: model.username.clone(), email: model.email.clone() }
    }
}

impl From<&UserSignUpInput> for UserUniqueInfo {
    fn from(model: &UserSignUpInput) -> Self {
        UserUniqueInfo { username: model.username.clone(), email: model.email.clone() }
    }
}

impl From<&UserUpdateInput> for UserUniqueInfo {
    fn from(model: &UserUpdateInput) -> Self {
        UserUniqueInfo { username: model.username.clone(), email: model.email.clone() }
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

pub fn user_create_unique_info_is_valid(repository: &dyn UserRepository, user: &UserUniqueInfo) -> Result<(), UserErr> {
    let unique_info = repository.read_count_unique_info(&user).map_err(UserErr::DB)?;
    let username_err = unique_info.username > 0;
    let email_err = unique_info.email > 0;
    if username_err || email_err {
        return Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr { username: username_err, email: email_err }));
    }
    Ok(())
}

pub fn user_update_unique_info_is_valid(repository: &dyn UserRepository, user: &UserUniqueInfo, old_user: &UserUniqueInfo) -> Result<(), UserErr> {
    if user.username == old_user.username && user.email == old_user.email {
        return Ok(());
    }
    let unique_info = repository.read_count_unique_info(&user).map_err(UserErr::DB)?;
    let username_err = user.username != old_user.username && unique_info.username > 0;
    let email_err = user.email != old_user.email && unique_info.email > 0;
    if username_err || email_err {
        return Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr { username: username_err, email: email_err }));
    }
    Ok(())
}

pub mod stub {
    use super::UserUniqueInfo;

    pub fn user_unique_info_stub_1() -> UserUniqueInfo {
        UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
    }
}

#[cfg(test)]
mod tests {
    use super::{UserUniqueInfo, UserUniqueInfoCount, UserUniqueInfoFieldErr, user_create_unique_info_is_valid, user_update_unique_info_is_valid};

    use crate::{
        database::DBErr,
        schedule::user::{
            error::UserErr,
            sign_up::stub::user_sign_up_input_stub,
            stub::{UserRepositoryStub, user_stub},
            update::stub::user_update_input_stub,
        },
    };

    #[test]
    fn unique_info() {
        assert_eq!(UserUniqueInfo::from(&user_stub()), UserUniqueInfo { username: "paul_mc".into(), email: "paul@gmail.com".into() });
        assert_eq!(UserUniqueInfo::from(&user_sign_up_input_stub()), UserUniqueInfo { username: "paul_mc".into(), email: "paul@gmail.com".into() });
        assert_eq!(UserUniqueInfo::from(&user_update_input_stub()), UserUniqueInfo { username: "john_lennon".into(), email: "john@gmail.com".into() })
    }

    #[test]
    fn user_create_unique_info_is_valid_ok() {
        assert_eq!(
            user_create_unique_info_is_valid(
                &UserRepositoryStub::default(),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
            ),
            Ok(())
        );
    }

    #[test]
    fn user_create_unique_info_is_valid_err() {
        assert_eq!(
            user_create_unique_info_is_valid(
                &UserRepositoryStub::of_db_err(),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
            ),
            Err(UserErr::DB(DBErr))
        );
        assert_eq!(
            user_create_unique_info_is_valid(
                &UserRepositoryStub::of_unique_info(UserUniqueInfoCount { username: 1, email: 0 }),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr { username: true, email: false })),
        );
        assert_eq!(
            user_create_unique_info_is_valid(
                &UserRepositoryStub::of_unique_info(UserUniqueInfoCount { username: 0, email: 1 }),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr { username: false, email: true })),
        );
        assert_eq!(
            user_create_unique_info_is_valid(
                &UserRepositoryStub::of_unique_info(UserUniqueInfoCount { username: 1, email: 1 }),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr { username: true, email: true })),
        );
    }

    #[test]
    fn user_update_unique_info_is_valid_ok() {
        assert_eq!(
            user_update_unique_info_is_valid(
                &UserRepositoryStub::default(),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
            ),
            Ok(())
        );
        assert_eq!(
            user_update_unique_info_is_valid(
                &UserRepositoryStub::of_unique_info(UserUniqueInfoCount { username: 1, email: 0 }),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
            ),
            Ok(()),
        );
        assert_eq!(
            user_update_unique_info_is_valid(
                &UserRepositoryStub::of_unique_info(UserUniqueInfoCount { username: 0, email: 1 }),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
            ),
            Ok(()),
        );
        assert_eq!(
            user_update_unique_info_is_valid(
                &UserRepositoryStub::of_unique_info(UserUniqueInfoCount { username: 1, email: 1 }),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
            ),
            Ok(()),
        );
        assert_eq!(
            user_update_unique_info_is_valid(
                &UserRepositoryStub::of_unique_info(UserUniqueInfoCount { username: 2, email: 1 }),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
            ),
            Ok(()),
        );
        assert_eq!(
            user_update_unique_info_is_valid(
                &UserRepositoryStub::of_unique_info(UserUniqueInfoCount { username: 1, email: 2 }),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
            ),
            Ok(()),
        );
        assert_eq!(
            user_update_unique_info_is_valid(
                &UserRepositoryStub::default(),
                &UserUniqueInfo { username: "peter987".into(), email: "peter@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
            ),
            Ok(())
        );
    }

    #[test]
    fn user_update_unique_info_is_valid_err() {
        assert_eq!(
            user_update_unique_info_is_valid(
                &UserRepositoryStub::of_db_err(),
                &UserUniqueInfo { username: "peter987".into(), email: "peter@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
            ),
            Err(UserErr::DB(DBErr))
        );
        assert_eq!(
            user_update_unique_info_is_valid(
                &UserRepositoryStub::of_unique_info(UserUniqueInfoCount { username: 1, email: 0 }),
                &UserUniqueInfo { username: "peter987".into(), email: "peter@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr { username: true, email: false })),
        );
        assert_eq!(
            user_update_unique_info_is_valid(
                &UserRepositoryStub::of_unique_info(UserUniqueInfoCount { username: 0, email: 1 }),
                &UserUniqueInfo { username: "peter987".into(), email: "peter@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr { username: false, email: true })),
        );
        assert_eq!(
            user_update_unique_info_is_valid(
                &UserRepositoryStub::of_unique_info(UserUniqueInfoCount { username: 1, email: 1 }),
                &UserUniqueInfo { username: "peter987".into(), email: "peter@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr { username: true, email: true })),
        );
    }
}
