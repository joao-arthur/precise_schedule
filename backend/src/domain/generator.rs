pub trait IdGen {
    fn gen(&self) -> String;
}

pub trait DateGen {
    fn gen(&self) -> String;
}

#[cfg(test)]
pub mod test {
    use super::*;

    pub struct IdGenStub(pub String);

    impl IdGen for IdGenStub {
        fn gen(&self) -> String {
            self.0.clone()
        }
    }

    pub struct DateGenStub(pub String);

    impl DateGen for DateGenStub {
        fn gen(&self) -> String {
            self.0.clone()
        }
    }

    #[test]
    fn test_id_gen_stub() {
        assert_eq!(IdGenStub(String::from("example")).gen(), String::from("example"));
    }

    #[test]
    fn test_date_gen_stub() {
        assert_eq!(
            DateGenStub(String::from("2024-07-03T22:49:51.279Z")).gen(),
            String::from("2024-07-03T22:49:51.279Z")
        );
    }
}
