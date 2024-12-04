pub mod create;
//pub mod delete;
//pub mod login;
//pub mod read_by_cred;
//pub mod read_by_id;
//pub mod unique_info;
//pub mod update;

#[derive(Debug, PartialEq)]
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
            id: String::from("a6edc906-2f9f-5fb2-a373-efac406f0ef2"),
            email: String::from("paul@gmail.com"),
            first_name: String::from("Paul McCartney"),
            birthdate: String::from("1942-06-18"),
            username: String::from("paul_mc"),
            password: String::from("asdf!@#123"),
            created_at: String::from("2024-03-01T11:26:41.279Z"),
            updated_at: String::from("2024-07-03T22:49:51.279Z"),
        }
    }

    pub fn user_cred_stub() -> UserCred {
        UserCred { username: String::from("paul_mc"), password: String::from("asdf!@#123") }
    }
}
