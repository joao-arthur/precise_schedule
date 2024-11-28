#[derive(Debug, PartialEq)]
struct Day {
    pub amount: u32,
}

impl Day {
    pub fn from(amount: u32) -> Self {
        Day { amount }
    }
}

#[derive(Debug, PartialEq)]
struct Week {
    pub amount: u32,
}

impl Week {
    pub fn from(amount: u32) -> Self {
        Week { amount }
    }
}

#[derive(Debug, PartialEq)]
struct Month {
    pub amount: u16,
}

impl Month {
    pub fn from(amount: u16) -> Self {
        Month { amount }
    }
}

#[derive(Debug, PartialEq)]
struct Year {
    pub amount: u16,
}

impl Year {
    pub fn from(amount: u16) -> Self {
        Year { amount }
    }
}

#[derive(Debug, PartialEq)]
struct Date {
    pub d: Day,
    pub w: Week,
    pub m: Month,
    pub y: Year,
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_day_intv() {
        assert_eq!(Day::from(1864), Day { amount: 1864 });
    }

    #[test]
    fn test_week_intv() {
        assert_eq!(Week::from(1864), Week { amount: 1864 });
    }

    #[test]
    fn test_month_intv() {
        assert_eq!(Month::from(1864), Month { amount: 1864 });
    }

    #[test]
    fn test_year_intv() {
        assert_eq!(Year::from(1864), Year { amount: 1864 });
    }
}
