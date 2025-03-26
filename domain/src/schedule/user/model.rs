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
