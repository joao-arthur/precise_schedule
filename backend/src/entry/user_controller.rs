#[post("/", format = "application/json")]
pub fn user_c() { }

#[put("/", format = "application/json")]
pub fn user_u() {}

#[get("/", format = "application/json")]
pub fn user_r() {}

#[post("/login", format = "application/json")]
pub fn user_login() {}
