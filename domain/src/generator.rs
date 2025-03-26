pub trait IdGen {
    fn gen(&self) -> String;
}

pub trait DateTimeGen {
    fn now_as_iso(&self) -> String;
    fn now_as_epoch(&self) -> u64;
}

#[cfg(test)]
pub mod stub {
    use super::*;

    pub struct IdGenStub(pub String);

    impl IdGen for IdGenStub {
        fn gen(&self) -> String {
            self.0.clone()
        }
    }

    pub struct DateTimeGenStub(pub String, pub u64);

    impl DateTimeGen for DateTimeGenStub {
        fn now_as_iso(&self) -> String {
            self.0.clone()
        }

        fn now_as_epoch(&self) -> u64 {
            self.1.clone()
        }
    }

    mod test {
        use super::*;

        #[test]
        fn test_id_gen_stub() {
            assert_eq!(
                IdGenStub(String::from("1aa4b955-2e7b-47d8-8ce2-758389cb1789")).gen(),
                String::from("1aa4b955-2e7b-47d8-8ce2-758389cb1789")
            );
        }

        #[test]
        fn test_date_time_gen_stub() {
            assert_eq!(
                DateTimeGenStub(String::from("2025-04-18T10:23Z"), 1734555761).now_as_iso(),
                String::from("2025-04-18T10:23Z")
            );
            assert_eq!(
                DateTimeGenStub(String::from("2025-04-18T10:23Z"), 1734555761).now_as_epoch(),
                1734555761
            );
        }
    }
}
