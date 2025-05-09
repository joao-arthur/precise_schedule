pub trait IdGenerator {
    fn generate(&self) -> String;
}

pub trait DateTimeGenerator {
    fn now_as_iso(&self) -> String;
    fn now_as_unix_epoch(&self) -> u64;
}

pub mod stub {
    use super::{DateTimeGenerator, IdGenerator};

    pub struct IdGeneratorStub(pub String);

    impl IdGenerator for IdGeneratorStub {
        fn generate(&self) -> String {
            self.0.clone()
        }
    }

    pub struct DateTimeGeneratorStub(pub String, pub u64);

    impl DateTimeGenerator for DateTimeGeneratorStub {
        fn now_as_iso(&self) -> String {
            self.0.clone()
        }

        fn now_as_unix_epoch(&self) -> u64 {
            self.1.clone()
        }
    }

    impl Default for DateTimeGeneratorStub {
        fn default() -> Self {
            DateTimeGeneratorStub("1970-01-01T00:00Z".into(), 0)
        }
    }

    impl DateTimeGeneratorStub {
        pub fn of_iso(value: String) -> Self {
            DateTimeGeneratorStub(value, Default::default())
        }

        pub fn of_unix_epoch(value: u64) -> Self {
            DateTimeGeneratorStub(Default::default(), value)
        }
    }
}

#[cfg(test)]
mod tests {
    use super::{DateTimeGenerator, DateTimeGeneratorStub, IdGenerator, IdGeneratorStub};

    #[test]
    fn id_gen_stub() {
        assert_eq!(IdGeneratorStub("1aa4b955-2e7b-47d8-8ce2-758389cb1789".into()).generate(), "1aa4b955-2e7b-47d8-8ce2-758389cb1789".to_string());
    }

    #[test]
    fn date_time_gen_stub() {
        assert_eq!(DateTimeGeneratorStub("2025-04-18T10:23Z".into(), 1734555761).now_as_iso(), "2025-04-18T10:23Z".to_string());
        assert_eq!(DateTimeGeneratorStub("2025-04-18T10:23Z".into(), 1734555761).now_as_unix_epoch(), 1734555761);
    }
}
