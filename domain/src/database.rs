#[derive(PartialEq, Debug, Clone)]
pub struct DBErr;

pub type DBOp<T> = Result<T, DBErr>;
