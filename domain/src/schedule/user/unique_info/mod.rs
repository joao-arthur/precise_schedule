pub mod unique_info_is_valid_sign_up;
pub mod unique_info_is_valid_update;

use super::{model::User, sign_up::UserSignUpInput, update::UserUpdateInput};

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

pub mod stub {
    use super::UserUniqueInfo;

    pub fn user_unique_info_stub() -> UserUniqueInfo {
        UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
    }
}

#[cfg(test)]
mod tests {
    use crate::schedule::user::{
        model::User, sign_up::UserSignUpInput, unique_info::UserUniqueInfo, update::UserUpdateInput,
    };

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
}
