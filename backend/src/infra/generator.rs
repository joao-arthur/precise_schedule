use std::time::SystemTime;

use chrono::Utc;
use uuid::Uuid;

use domain::generator::{DateTimeGen, IdGen};

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
        Utc::now().format("%Y-%m-%dT%H:%MZ").to_string()
    }

    fn now_as_epoch(&self) -> u64 {
        SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap().as_secs()
    }
}

#[cfg(test)]
mod test {
    use std::sync::LazyLock;

    use regex::Regex;

    use super::*;

    const EPOCH_2024: u64 = 1704067200;
    static UUID_RE: LazyLock<Regex> = LazyLock::new(|| {
        Regex::new(r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$").unwrap()
    });
    static ISO_DATE_RE: LazyLock<Regex> =
        LazyLock::new(|| Regex::new(r"^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}Z$").unwrap());

    #[test]
    fn test_id_gen_uuid4() {
        let id = IdGenUUID4.gen();
        assert!(UUID_RE.is_match(&id));
    }

    #[test]
    fn test_date_time_gen_now_as_iso() {
        let curr_as_iso = DateTimeGenImpl.now_as_iso();
        assert!(ISO_DATE_RE.is_match(&curr_as_iso));
    }

    #[test]
    fn test_date_time_gen_now_as_epoch() {
        assert!(DateTimeGenImpl.now_as_epoch() > EPOCH_2024)
    }
}
