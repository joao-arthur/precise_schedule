use std::collections::HashMap;

pub struct ReqV {}
pub struct IntV {}
pub struct IntMinV {
    pub value: i64,
}
pub struct IntMaxV {
    pub value: i64,
}

pub enum VType {
    Req(ReqV),
    Int(IntV),
    IntMin(IntMinV),
    IntMax(IntMaxV),
}

#[derive(PartialEq, Debug)]
pub struct ReqErr {}

#[derive(PartialEq, Debug)]
pub struct IntErr {}

#[derive(PartialEq, Debug)]
pub struct IntMinErr {}

#[derive(PartialEq, Debug)]
pub struct IntMaxErr {}

pub enum Value {
    Bool(bool),
    Int(i64),
    Float(f64),
    Str(String),
    Arr(Vec<Value>),
    Obj(HashMap<String, Value>),
    Absent,
}

pub type Schema<'a> = HashMap<&'a str, Vec<VType>>;
