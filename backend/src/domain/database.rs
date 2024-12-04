use std::fmt;

#[derive(PartialEq, Clone, Debug)]
pub struct DBErr;

impl fmt::Display for DBErr {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "DBErr")
    }
}

pub trait DB {
    fn c(&self, ent: String) -> Result<(), DBErr>;
    fn u(&self, ent: String) -> Result<(), DBErr>;
    fn d(&self, ent: String) -> Result<(), DBErr>;
}

#[cfg(test)]
pub mod test {
    use super::*;

    pub struct DBStub(Result<(), DBErr>);

    impl DB for DBStub {
        fn c(&self, _: String) -> Result<(), DBErr> {
            self.0.clone()
        }
        fn u(&self, _: String) -> Result<(), DBErr> {
            self.0.clone()
        }
        fn d(&self, _: String) -> Result<(), DBErr> {
            self.0.clone()
        }
    }

    #[test]
    fn test_db_stub() {
        assert_eq!(DBStub(Ok(())).c(String::from("")), Ok(()));
        assert_eq!(DBStub(Err(DBErr)).c(String::from("")), Err(DBErr));
        assert_eq!(DBStub(Ok(())).u(String::from("")), Ok(()));
        assert_eq!(DBStub(Err(DBErr)).u(String::from("")), Err(DBErr));
        assert_eq!(DBStub(Ok(())).d(String::from("")), Ok(()));
        assert_eq!(DBStub(Err(DBErr)).d(String::from("")), Err(DBErr));
    }
}
