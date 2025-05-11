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

pub fn user_sign_up_unique_info_is_valid(repository: &dyn UserRepository, user: &UserUniqueInfo) -> Result<(), UserErr> {
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

    pub fn user_unique_info_stub() -> UserUniqueInfo {
        UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        schedule::user::{error::UserErr, model::User, repository::stub::UserRepositoryStub, sign_up::UserSignUpInput, update::UserUpdateInput},
    };

    use super::{UserUniqueInfo, UserUniqueInfoCount, UserUniqueInfoFieldErr, user_sign_up_unique_info_is_valid, user_update_unique_info_is_valid};

    #[test]
    fn unique_info_from() {
        assert_eq!(
            UserUniqueInfo::from(&User {
                id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                email: "paul@gmail.com".into(),
                first_name: "Paul McCartney".into(),
                birthdate: "1942-06-18".into(),
                username: "macca".into(),
                password: "asdf!@#123".into(),
                created_at: "2024-03-01T11:26Z".into(),
                updated_at: "2024-07-03T22:49Z".into(),
            }),
            UserUniqueInfo { username: "macca".into(), email: "paul@gmail.com".into() }
        );
        assert_eq!(
            UserUniqueInfo::from(&UserSignUpInput {
                email: "george@gmail.com".into(),
                first_name: "George Harrison".into(),
                birthdate: "1943-02-25".into(),
                username: "hare_george".into(),
                password: "asdf!@#123".into(),
            }),
            UserUniqueInfo { username: "hare_george".into(), email: "george@gmail.com".into() }
        );
        assert_eq!(
            UserUniqueInfo::from(&UserUpdateInput {
                email: "john@gmail.com".into(),
                first_name: "John Lennon".into(),
                birthdate: "1940-10-09".into(),
                username: "john_lennon".into(),
                password: "abcd!@#$4321".into(),
            }),
            UserUniqueInfo { username: "john_lennon".into(), email: "john@gmail.com".into() }
        )
    }

    #[test]
    fn user_sign_up_unique_info_is_valid_ok() {
        assert_eq!(
            user_sign_up_unique_info_is_valid(
                &UserRepositoryStub::default(),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
            ),
            Ok(())
        );
    }

    #[test]
    fn user_sign_up_unique_info_is_valid_err() {
        assert_eq!(
            user_sign_up_unique_info_is_valid(
                &UserRepositoryStub::of_db_err(),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
            ),
            Err(UserErr::DB(DBErr))
        );
        assert_eq!(
            user_sign_up_unique_info_is_valid(
                &UserRepositoryStub::of_unique_info(UserUniqueInfoCount { username: 1, email: 0 }),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr { username: true, email: false })),
        );
        assert_eq!(
            user_sign_up_unique_info_is_valid(
                &UserRepositoryStub::of_unique_info(UserUniqueInfoCount { username: 0, email: 1 }),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr { username: false, email: true })),
        );
        assert_eq!(
            user_sign_up_unique_info_is_valid(
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
