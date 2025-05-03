use std::fmt;

#[derive(PartialEq, Clone, Debug)]
pub struct DBErr;

impl fmt::Display for DBErr {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "DBErr")
    }
}

pub type DBOp<T> = Result<T, DBErr>;

pub trait DB {
    fn c(&self, ent: String) -> DBOp<()>;
    fn u(&self, ent: String) -> DBOp<()>;
    fn d(&self, ent: String) -> DBOp<()>;
}

#[cfg(test)]
pub mod test {
    use super::{DB, DBErr, DBOp};

    pub struct DBStub(DBOp<()>);

    impl DB for DBStub {
        fn c(&self, _: String) -> DBOp<()> {
            self.0.clone()
        }
        fn u(&self, _: String) -> DBOp<()> {
            self.0.clone()
        }
        fn d(&self, _: String) -> DBOp<()> {
            self.0.clone()
        }
    }

    #[test]
    fn test_db_stub() {
        assert_eq!(DBStub(Ok(())).c("".into()), Ok(()));
        assert_eq!(DBStub(Err(DBErr)).c("".into()), Err(DBErr));
        assert_eq!(DBStub(Ok(())).u("".into()), Ok(()));
        assert_eq!(DBStub(Err(DBErr)).u("".into()), Err(DBErr));
        assert_eq!(DBStub(Ok(())).d("".into()), Ok(()));
        assert_eq!(DBStub(Err(DBErr)).d("".into()), Err(DBErr));
    }
}
