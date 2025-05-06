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
    fn create(&self, ent: String) -> DBOp<()>;
    fn update(&self, ent: String) -> DBOp<()>;
    fn delete(&self, ent: String) -> DBOp<()>;
}

#[cfg(test)]
pub mod tests {
    use super::{DB, DBErr, DBOp};

    pub struct DBStub(DBOp<()>);

    impl DB for DBStub {
        fn create(&self, _: String) -> DBOp<()> {
            self.0.clone()
        }
        fn update(&self, _: String) -> DBOp<()> {
            self.0.clone()
        }
        fn delete(&self, _: String) -> DBOp<()> {
            self.0.clone()
        }
    }

    #[test]
    fn db_stub() {
        assert_eq!(DBStub(Ok(())).create("".into()), Ok(()));
        assert_eq!(DBStub(Err(DBErr)).create("".into()), Err(DBErr));
        assert_eq!(DBStub(Ok(())).update("".into()), Ok(()));
        assert_eq!(DBStub(Err(DBErr)).update("".into()), Err(DBErr));
        assert_eq!(DBStub(Ok(())).delete("".into()), Ok(()));
        assert_eq!(DBStub(Err(DBErr)).delete("".into()), Err(DBErr));
    }
}
