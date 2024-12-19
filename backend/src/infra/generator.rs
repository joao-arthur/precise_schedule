use std::time::SystemTime;

use chrono::Local;
use uuid::Uuid;

use crate::domain::generator::{DateGen, IdGen, TimeGen};

pub struct IdGenUUID4;

pub struct DateGenChrono;

pub struct TimeGenUnix;

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

impl TimeGen for TimeGenUnix {
    fn gen(&self) -> u64 {
        SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap().as_secs()
    }
}
