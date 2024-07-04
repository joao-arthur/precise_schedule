use std::collections::HashMap;

pub struct ReqV {}
pub struct IntV {}
pub struct StrV {}

pub struct IntMinV {
    pub value: i64,
}

pub struct IntMaxV {
    pub value: i64,
}

pub struct StrMinLenV {
    pub value: i64,
}

pub struct StrMaxLenV {
    pub value: i64,
}

pub enum V {
    Req(ReqV),
    Int(IntV),
    Str(StrV),
    IntMin(IntMinV),
    IntMax(IntMaxV),
    StrMinLen(StrMinLenV),
    StrMaxLen(StrMaxLenV),
}

#[derive(PartialEq, Debug)]
pub struct ReqErr;

#[derive(PartialEq, Debug)]
pub struct IntErr;

#[derive(PartialEq, Debug)]
pub struct StrErr;

#[derive(PartialEq, Debug)]
pub struct IntMinErr;

#[derive(PartialEq, Debug)]
pub struct IntMaxErr;

#[derive(PartialEq, Debug)]
pub struct StrMinLenErr;

#[derive(PartialEq, Debug)]
pub struct StrMaxLenErr;

pub enum Value {
    Bool(bool),
    Int(i64),
    Float(f64),
    Str(String),
    Arr(Vec<Value>),
    Obj(HashMap<String, Value>),
    Absent,
}

pub type Schema<'a> = HashMap<&'a str, Vec<V>>;
