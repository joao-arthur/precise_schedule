#[tokio::main]
async fn main() {
    let _ = backend::server::start_server().await;
}
