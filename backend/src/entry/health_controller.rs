#[get("/", format = "application/json")]
pub fn endpoint_health_r() -> &'static str {
    "Hello, world!"
}
