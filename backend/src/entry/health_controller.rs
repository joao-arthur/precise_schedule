#[get("/", format = "application/json")]
pub fn health_r() -> &'static str {
    "Hello, world!"
}
