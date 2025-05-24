use backend::server::start_server;

#[tokio::main]
async fn main() {
    let _ = start_server().await;
}
