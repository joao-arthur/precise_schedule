pub struct User<'a> {
    pub id: &'a str,
    pub first_name: &'a str,
    pub birthdate: &'a str,
    pub email: &'a str,
    pub username: &'a str,
    pub password: &'a str,
    pub created_at: &'a str,
    pub updated_at: &'a str,
}

impl UserCreate {

}

impl UserUpdateFn {
    
}