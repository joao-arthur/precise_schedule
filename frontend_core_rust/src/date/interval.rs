#[derive(Debug, PartialEq)]
pub struct Day(pub u32);

#[derive(Debug, PartialEq)]
pub struct Week(pub u32);

#[derive(Debug, PartialEq)]
pub struct Month(pub u16);

#[derive(Debug, PartialEq)]
pub struct Year(pub u16);

#[derive(Debug, PartialEq)]
struct Dt {
    pub d: Day,
    pub w: Week,
    pub m: Month,
    pub y: Year,
}

#[cfg(test)]
mod test {
    use super::*;

}
