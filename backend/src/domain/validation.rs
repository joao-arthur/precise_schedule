use std::collections::HashMap;

#[derive(Debug, PartialEq)]
pub struct RequiredErr;

#[derive(Debug, PartialEq)]
pub struct NumIErr;

#[derive(Debug, PartialEq)]
pub struct NumUErr;

#[derive(Debug, PartialEq)]
pub struct NumFErr;

#[derive(Debug, PartialEq)]
pub struct StrErr;

#[derive(Debug, PartialEq)]
pub struct BoolErr;

#[derive(Debug, PartialEq)]
pub struct NumIExactErr;

#[derive(Debug, PartialEq)]
pub struct NumIMinErr;

#[derive(Debug, PartialEq)]
pub struct NumIMaxErr;

#[derive(Debug, PartialEq)]
pub struct NumUExactErr;

#[derive(Debug, PartialEq)]
pub struct NumUMinErr;

#[derive(Debug, PartialEq)]
pub struct NumUMaxErr;

#[derive(Debug, PartialEq)]
pub struct NumFExactErr;

#[derive(Debug, PartialEq)]
pub struct NumFMinErr;

#[derive(Debug, PartialEq)]
pub struct NumFMaxErr;

#[derive(Debug, PartialEq)]
pub struct StrExactErr;

#[derive(Debug, PartialEq)]
pub struct StrExactLenErr;

#[derive(Debug, PartialEq)]
pub struct StrMinLenErr;

#[derive(Debug, PartialEq)]
pub struct StrMaxLenErr;

#[derive(Debug, PartialEq)]
pub struct StrMinUpperErr;

#[derive(Debug, PartialEq)]
pub struct StrMinLowerErr;

#[derive(Debug, PartialEq)]
pub struct StrMinNumErr;

#[derive(Debug, PartialEq)]
pub struct StrMinSpecialErr;

#[derive(Debug, PartialEq)]
pub struct DtErr;

#[derive(Debug, PartialEq)]
pub struct DtMinErr;

#[derive(Debug, PartialEq)]
pub struct DtMaxErr;

#[derive(Debug, PartialEq)]
pub struct EmailErr;

pub enum Validation {
    Required,
    NumI,
    NumU,
    NumF,
    Str,
    Bool,
    NumIExact(i64),
    NumIMin(i64),
    NumIMax(i64),
    NumUExact(u64),
    NumUMin(u64),
    NumUMax(u64),
    NumFExact(f64),
    NumFMin(f64),
    NumFMax(f64),
    StrExact(String),
    StrExactLen(u32),
    StrMinLen(u32),
    StrMaxLen(u32),
    StrMinUpper(u32),
    StrMinLower(u32),
    StrMinNum(u32),
    StrMinSpecial(u32),
    Dt,
    DtMin(String),
    DtMax(String),
    Email,
}

pub enum ValidationErr {
    RequiredErr(RequiredErr),
    NumIErr(NumIErr),
    NumUErr(NumUErr),
    NumFErr(NumFErr),
    StrErr(StrErr),
    BoolErr(BoolErr),
    NumIExactErr(NumIExactErr),
    NumIMinErr(NumIMinErr),
    NumIMaxErr(NumIMaxErr),
    NumUExactErr(NumUExactErr),
    NumUMinErr(NumUMinErr),
    NumUMaxErr(NumUMaxErr),
    NumFExactErr(NumFExactErr),
    NumFMinErr(NumFMinErr),
    NumFMaxErr(NumFMaxErr),
    StrExactErr(StrExactErr),
    StrExactLenErr(StrExactLenErr),
    StrMinLenErr(StrMinLenErr),
    StrMaxLenErr(StrMaxLenErr),
    StrMinUpperErr(StrMinUpperErr),
    StrMinLowerErr(StrMinLowerErr),
    StrMinNumErr(StrMinNumErr),
    StrMinSpecialErr(StrMinSpecialErr),
    DtErr(DtErr),
    DtMinErr(DtMinErr),
    DtMaxErr(DtMaxErr),
    EmailErr(EmailErr),
}

pub enum Value {
    NumU(u64),
    NumI(i64),
    NumF(f64),
    Str(String),
    Bool(bool),
    Arr(Vec<Value>),
    Obj(HashMap<String, Value>),
    Absent,
}

pub type Schema<'a> = HashMap<&'a str, Vec<Validation>>;
