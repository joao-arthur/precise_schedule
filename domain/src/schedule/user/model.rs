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

pub mod stub {
    use super::User;

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
}
