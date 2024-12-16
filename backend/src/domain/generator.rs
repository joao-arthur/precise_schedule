pub trait IdGen {
    fn gen(&self) -> String;
}

pub trait DateGen {
    fn gen(&self) -> String;
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

    pub struct DateGenStub(pub String);

    impl DateGen for DateGenStub {
        fn gen(&self) -> String {
            self.0.clone()
        }
    }

    mod test {
        use super::*;

        #[test]
        fn test_id_gen_stub() {
            assert_eq!(IdGenStub(String::from("Lorem ipsum")).gen(), String::from("Lorem ipsum"));
        }

        #[test]
        fn test_date_gen_stub() {
            assert_eq!(DateGenStub(String::from("Lorem ipsum")).gen(), String::from("Lorem ipsum"));
        }
    }
}
