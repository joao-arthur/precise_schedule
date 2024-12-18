use chrono::Local;
use uuid::Uuid;

use crate::domain::generator::{DateGen, IdGen};

pub struct IdGenUUID4;

pub struct DateGenChrono;

impl IdGen for IdGenUUID4 {
    fn gen(&self) -> String {
        Uuid::new_v4().to_string()
    }
}

impl DateGen for DateGenChrono {
    fn gen(&self) -> String {
        Local::now().format("%Y-%m-%d").to_string()
    }
}
