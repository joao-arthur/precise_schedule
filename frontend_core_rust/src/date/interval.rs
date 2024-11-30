#[derive(Debug, PartialEq)]
pub struct Y(pub u16);

#[derive(Debug, PartialEq)]
pub struct M(pub u16);

#[derive(Debug, PartialEq)]
pub struct W(pub u32);

#[derive(Debug, PartialEq)]
pub struct D(pub u32);

#[derive(Debug, PartialEq)]
pub struct Dt {
    pub y: Y,
    pub m: M,
    pub w: W,
    pub d: D,
}

impl Dt {
    pub fn from(y: u16, m: u16, w: u32, d: u32) -> Self {
        Dt { y: Y(y), m: M(m), w: W(w), d: D(d) }
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_dt_intv() {
        assert_eq!(Dt::from(1, 14, 58, 393), Dt { y: Y(1), m: M(14), w: W(58), d: D(393) })
    }
}
