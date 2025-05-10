use std::fmt;

#[derive(PartialEq, Clone, Debug)]
pub struct DBErr;

impl fmt::Display for DBErr {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "DBErr")
    }
}

pub type DBOp<T> = Result<T, DBErr>;
