use crate::date::gregorian::Date;

#[derive(Debug, PartialEq)]
pub enum Period {
    D1,
    D2,
    W1,
    W2,
    M1,
    M3,
    M6,
    Y1,
    Y2,
}

#[derive(Debug, PartialEq)]
pub struct Event {
    dt: Date,
    freq: Option<Period>,
}

impl Event {
    pub fn from(dt: Date, freq: Period) -> Self {
        Event { dt, freq: Some(freq) }
    }
}

#[cfg(test)]
mod test {
    use crate::date::gregorian::{DateDay, DateMonth, DateYear};

    use super::*;
    #[test]
    fn test_event() {
        assert_eq!(
            Event::from(Date::from(2024, 11, 22), Period::M6),
            Event {
                dt: Date { y: DateYear(2024), m: DateMonth::Nov, d: DateDay(22) },
                freq: Some(Period::M6)
            }
        );
    }
}
