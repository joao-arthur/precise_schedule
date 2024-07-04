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
        assert_eq!(IdGenStub("example".to_owned()).gen(), "example".to_owned());
    }

    #[test]
    fn test_date_gen_stub() {
        assert_eq!(
            DateGenStub("2024-07-03T22:49:51.279Z".to_owned()).gen(),
            "2024-07-03T22:49:51.279Z".to_owned()
        );
    }
}
