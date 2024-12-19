use std::time::SystemTime;

use chrono::{SecondsFormat, Utc};
use uuid::Uuid;

use crate::domain::generator::{DateTimeGen, IdGen};

pub struct IdGenUUID4;

pub struct DateTimeGenImpl;

pub struct TimeGenUnix;

impl IdGen for IdGenUUID4 {
    fn gen(&self) -> String {
        Uuid::new_v4().to_string()
    }
}

impl DateTimeGen for DateTimeGenImpl {
    fn now_as_iso(&self) -> String {
        Utc::now().to_rfc3339_opts(SecondsFormat::Secs, true)
    }

    fn now_as_epoch(&self) -> u64 {
        SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap().as_secs()
    }
}

#[cfg(test)]
mod test {
    use regex::Regex;

    use super::*;

    const EPOCH_2024: u64 = 1704067200;

    #[test]
    fn test_id_gen_uuid4() {
        let re =
            Regex::new(r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$").unwrap();
        let id = IdGenUUID4.gen();
        assert_eq!(re.is_match(&id), true);
    }

    #[test]
    fn test_date_time_gen_now_as_iso() {
        let re = Regex::new(r"^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$").unwrap();
        let curr_as_iso = DateTimeGenImpl.now_as_iso();
        assert_eq!(re.is_match(&curr_as_iso), true);
    }

    #[test]
    fn test_date_time_gen_now_as_epoch() {
        assert_eq!(DateTimeGenImpl.now_as_epoch() > EPOCH_2024, true)
    }
}
