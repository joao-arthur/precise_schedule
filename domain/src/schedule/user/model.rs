#[derive(Debug, PartialEq, Clone)]
pub struct User {
    pub id: String,
    pub username: String,
    pub password: String,
    pub email: String,
    pub first_name: String,
    pub birthdate: String,
    pub created_at: String,
    pub updated_at: String,
}

/*
enum Language {
    Por,
    Eng,
    Spa,
    Deu,
    Lat
}

enum Status {
    Active,
    Excluding,
}

struct Password {
    pepper: String,
    salt: String,
    iterations: u16,
    hash: String,
}
*/

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

#[derive(Debug, PartialEq)]
pub struct UserCredentials {
    pub username: String,
    pub password: String,
}

pub mod stub {
    use super::{User, UserCredentials, UserInfo};

    pub fn user_stub() -> User {
        User {
            id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
            email: "paul@gmail.com".into(),
            first_name: "Paul McCartney".into(),
            birthdate: "1942-06-18".into(),
            username: "macca".into(),
            password: "asdf!@#123".into(),
            created_at: "2024-03-01T11:26Z".into(),
            updated_at: "2024-07-03T22:49Z".into(),
        }
    }

    pub fn user_info_stub() -> UserInfo {
        UserInfo {
            email: "paul@gmail.com".into(),
            first_name: "Paul McCartney".into(),
            birthdate: "1942-06-18".into(),
            username: "macca".into(),
        }
    }

    pub fn user_credentials_stub() -> UserCredentials {
        UserCredentials { username: "macca".into(), password: "asdf!@#123".into() }
    }
}

#[cfg(test)]
mod tests {
    use super::{User, UserInfo};

    #[test]
    fn user_info() {
        assert_eq!(
            UserInfo::from(User {
                id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                email: "paul@gmail.com".into(),
                first_name: "Paul McCartney".into(),
                birthdate: "1942-06-18".into(),
                username: "macca".into(),
                password: "asdf!@#123".into(),
                created_at: "2024-03-01T11:26Z".into(),
                updated_at: "2024-07-03T22:49Z".into(),
            }),
            UserInfo {
                email: "paul@gmail.com".into(),
                first_name: "Paul McCartney".into(),
                birthdate: "1942-06-18".into(),
                username: "macca".into(),
            }
        );
    }
}
