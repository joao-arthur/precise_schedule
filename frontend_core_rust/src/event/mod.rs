use crate::date::gregorian::Dt;

#[derive(Debug, PartialEq)]
pub enum Period {
    D1,
    D2,
    W1,
    W2,
    M1,
    M2,
    M3,
    M4,
    M6,
    Y1,
    Y2,
    Y4,
    Y5,
    Y6,
    Y10,
}

#[derive(Debug, PartialEq)]
pub struct Evt {
    pub dt: Dt,
    pub freq: Option<Period>,
}

impl Evt {
    pub fn from(dt: Dt, freq: Period) -> Self {
        Evt { dt, freq: Some(freq) }
    }
}

#[cfg(test)]
mod test {
    use crate::date::gregorian::{DtDay, DtMonth, DtYear};

    use super::*;
    #[test]
    fn test_event() {
        assert_eq!(
            Evt::from(Dt::from(2024, 11, 22), Period::M6),
            Evt {
                dt: Dt { y: DtYear(2024), m: DtMonth::Nov, d: DtDay(22) },
                freq: Some(Period::M6)
            }
        );
    }
}
