pub mod read_by_cred;
pub mod read_by_id;

#[derive(Debug, PartialEq, Clone)]
pub struct User {
    pub id: String,
    pub first_name: String,
    pub birthdate: String,
    pub email: String,
    pub username: String,
    pub created_at: String,
    pub password: String,
    pub updated_at: String,
}

pub struct UserCred {
    pub username: String,
    pub password: String,
}

pub struct UserUniqueInfo {
    pub email: String,
    pub username: String,
}

#[cfg(test)]
pub mod test {
    use super::{User, UserCred};

    pub fn user_stub() -> User {
        User {
            id: "user_id".to_owned(),
            email: "paul@gmail.com".to_owned(),
            first_name: "Paul McCartney".to_owned(),
            birthdate: "1942-06-18".to_owned(),
            username: "paul_mc".to_owned(),
            password: "asdf!@#123".to_owned(),
            created_at: "2024-03-01T11:26:41.279Z".to_owned(),
            updated_at: "2024-07-03T22:49:51.279Z".to_owned(),
        }
    }

    pub fn user_cred_stub() -> UserCred {
        UserCred { username: "paul_mc".to_owned(), password: "asdf!@#123".to_owned() }
    }
}
