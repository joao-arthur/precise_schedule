pub trait IdGen {
    fn gen(&self) -> String;
}

pub struct IdGenStub(pub String);

impl IdGen for IdGenStub {
    fn gen(&self) -> String {
        self.0.clone()
    }
}

pub trait DateGen {
    fn gen(&self) -> String;
}

pub struct DateGenStub(pub String);

impl DateGen for DateGenStub {
    fn gen(&self) -> String {
        self.0.clone()
    }
}

#[cfg(test)]
mod generator_test {
    use super::*;

    #[test]
    fn test_id_gen_stub() {
        assert_eq!(
            IdGenStub("example".to_string()).gen(),
            "example".to_string()
        );
    }

    #[test]
    fn test_date_gen_stub() {
        assert_eq!(
            DateGenStub("2024-07-03T22:49:51.279Z".to_string()).gen(),
            "2024-07-03T22:49:51.279Z".to_string()
        );
    }
}
