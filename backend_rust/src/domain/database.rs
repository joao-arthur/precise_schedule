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
    //fn u(&self, ent: String) -> Result<(), DBErr>;
    //fn d(&self, ent: String) -> Result<(), DBErr>;
}

pub struct DBStub(Result<(), DBErr>);

impl DB for DBStub {
    fn c(&self, _: String) -> Result<(), DBErr> {
        self.0.clone()
    }
}

#[cfg(test)]
mod db_test {
    use super::*;

    #[test]
    fn test_db_stub() {
        assert_eq!(DBStub(Ok(())).c("".to_owned()), Ok(()));
        assert_eq!(DBStub(Err(DBErr)).c("".to_owned()), Err(DBErr));
    }
}
