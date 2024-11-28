use std::{fmt, ops};

#[derive(Debug, PartialEq)]
pub struct DateYear(pub u16);

#[derive(Debug, PartialEq)]
pub enum DateMonth {
    Jan,
    Feb,
    Mar,
    Apr,
    May,
    Jun,
    Jul,
    Aug,
    Sep,
    Oct,
    Nov,
    Dec,
}

impl DateMonth {
    pub fn from_u8(m: u8) -> Option<Self> {
        match m {
            1 => Some(DateMonth::Jan),
            2 => Some(DateMonth::Feb),
            3 => Some(DateMonth::Mar),
            4 => Some(DateMonth::Apr),
            5 => Some(DateMonth::May),
            6 => Some(DateMonth::Jun),
            7 => Some(DateMonth::Jul),
            8 => Some(DateMonth::Aug),
            9 => Some(DateMonth::Sep),
            10 => Some(DateMonth::Oct),
            11 => Some(DateMonth::Nov),
            12 => Some(DateMonth::Dec),
            _ => None,
        }
    }

    pub fn to_u8(self: &Self) -> u8 {
        match self {
            DateMonth::Jan => 1,
            DateMonth::Feb => 2,
            DateMonth::Mar => 3,
            DateMonth::Apr => 4,
            DateMonth::May => 5,
            DateMonth::Jun => 6,
            DateMonth::Jul => 7,
            DateMonth::Aug => 8,
            DateMonth::Sep => 9,
            DateMonth::Oct => 10,
            DateMonth::Nov => 11,
            DateMonth::Dec => 12,
        }
    }
}

#[derive(Debug, PartialEq)]
pub struct DateDay(pub u8);

#[derive(Debug, PartialEq)]
pub struct Date {
    pub y: DateYear,
    pub m: DateMonth,
    pub d: DateDay,
}

impl fmt::Display for Date {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{:04}-{:02}-{:02}", self.y.0, self.m.to_u8(), self.d.0)
    }
}

impl Date {
    pub fn from(y: u16, m: u8, d: u8) -> Self {
        Date { y: DateYear(y), m: DateMonth::from_u8(m).unwrap(), d: DateDay(d) }
    }
}

/*
impl ops::Add<DayIntv> for Date {
    type Output = Date;

    fn add(self, day: DayIntv) -> Date {
        Date { y, m, d }
    }
}
impl ops::Sub<DayIntv> for Date {
    type Output = Date;

    fn sub(self, day: DayIntv) -> Date {
        Date { y, m, d }
    }
}

impl ops::Add<WeekIntv> for Date {
    type Output = Date;

    fn add(self, week: WeekIntv) -> Date {
        Date { y, m, d }
    }
}

impl ops::Sub<WeekIntv> for Date {
    type Output = Date;

    fn sub(self, week: WeekIntv) -> Date {
        Date { y, m, d }
    }
}

impl ops::Add<MonthIntv> for Date {
    type Output = Date;

    fn add(self, month: MonthIntv) -> Date {
        Date { y, m, d }
    }
}

impl ops::Sub<MonthIntv> for Date {
    type Output = Date;

    fn sub(self, month: MonthIntv) -> Date {
        Date { y, m, d }
    }
}

impl ops::Add<YearIntv> for Date {
    type Output = Date;

    fn add(self, year: YearIntv) -> Date {
        Date { y, m, d }
    }
}

impl ops::Sub<YearIntv> for Date {
    type Output = Date;

    fn sub(self, year: YearIntv) -> Date {
        Date { y, m, d }
    }
}*/

fn is_leap_year(y: DateYear) -> bool {
    if y.0 % 400 == 0 {
        return true;
    }
    if y.0 % 100 == 0 {
        return false;
    }
    return y.0 % 4 == 0;
}

fn month_days(y: DateYear, m: DateMonth) -> DateDay {
    match m {
        DateMonth::Jan => DateDay(31),
        DateMonth::Feb => {
            if is_leap_year(y) {
                DateDay(29)
            } else {
                DateDay(28)
            }
        }
        DateMonth::Mar => DateDay(31),
        DateMonth::Apr => DateDay(30),
        DateMonth::May => DateDay(31),
        DateMonth::Jun => DateDay(30),
        DateMonth::Jul => DateDay(31),
        DateMonth::Aug => DateDay(31),
        DateMonth::Sep => DateDay(30),
        DateMonth::Oct => DateDay(31),
        DateMonth::Nov => DateDay(30),
        DateMonth::Dec => DateDay(31),
    }
}

fn days_in_year(y: DateYear) -> u16 {
    if is_leap_year(y) {
        366
    } else {
        365
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_date_month() {
        assert_eq!(DateMonth::from_u8(0), None);
        assert_eq!(DateMonth::from_u8(1), Some(DateMonth::Jan));
        assert_eq!(DateMonth::from_u8(2), Some(DateMonth::Feb));
        assert_eq!(DateMonth::from_u8(3), Some(DateMonth::Mar));
        assert_eq!(DateMonth::from_u8(4), Some(DateMonth::Apr));
        assert_eq!(DateMonth::from_u8(5), Some(DateMonth::May));
        assert_eq!(DateMonth::from_u8(6), Some(DateMonth::Jun));
        assert_eq!(DateMonth::from_u8(7), Some(DateMonth::Jul));
        assert_eq!(DateMonth::from_u8(8), Some(DateMonth::Aug));
        assert_eq!(DateMonth::from_u8(9), Some(DateMonth::Sep));
        assert_eq!(DateMonth::from_u8(10), Some(DateMonth::Oct));
        assert_eq!(DateMonth::from_u8(11), Some(DateMonth::Nov));
        assert_eq!(DateMonth::from_u8(12), Some(DateMonth::Dec));
        assert_eq!(DateMonth::from_u8(13), None);
        assert_eq!(DateMonth::from_u8(14), None);
    }

    #[test]
    fn test_date() {
        let dt = Date::from(876, 7, 4);
        assert_eq!(dt, Date { y: DateYear(876), m: DateMonth::Jul, d: DateDay(4) });
        assert_eq!(format!("{dt}"), "0876-07-04");
    }

    #[test]
    fn test_is_leap_year_divisable_by_four() {
        assert_eq!(is_leap_year(DateYear(2004)), true);
        assert_eq!(is_leap_year(DateYear(2008)), true);
        assert_eq!(is_leap_year(DateYear(2012)), true);
        assert_eq!(is_leap_year(DateYear(2016)), true);
        assert_eq!(is_leap_year(DateYear(2020)), true);
        assert_eq!(is_leap_year(DateYear(2024)), true);
    }

    #[test]
    fn test_is_leap_year_divisable_by_one_hundred() {
        assert_eq!(is_leap_year(DateYear(1300)), false);
        assert_eq!(is_leap_year(DateYear(1400)), false);
        assert_eq!(is_leap_year(DateYear(1500)), false);
        assert_eq!(is_leap_year(DateYear(1700)), false);
        assert_eq!(is_leap_year(DateYear(1800)), false);
        assert_eq!(is_leap_year(DateYear(1900)), false);
    }

    #[test]
    fn test_is_leap_year_divisable_by_four_hundred() {
        assert_eq!(is_leap_year(DateYear(400)), true);
        assert_eq!(is_leap_year(DateYear(800)), true);
        assert_eq!(is_leap_year(DateYear(1200)), true);
        assert_eq!(is_leap_year(DateYear(1600)), true);
        assert_eq!(is_leap_year(DateYear(2000)), true);
    }

    #[test]
    fn test_is_leap_year_other_years() {
        assert_eq!(is_leap_year(DateYear(1900)), false);
        assert_eq!(is_leap_year(DateYear(1901)), false);
        assert_eq!(is_leap_year(DateYear(1902)), false);
        assert_eq!(is_leap_year(DateYear(1903)), false);
        assert_eq!(is_leap_year(DateYear(2001)), false);
        assert_eq!(is_leap_year(DateYear(2002)), false);
        assert_eq!(is_leap_year(DateYear(2003)), false);
    }

    #[test]
    fn test_month_days_except_febrary() {
        assert_eq!(month_days(DateYear(2000), DateMonth::Jan), DateDay(31));
        assert_eq!(month_days(DateYear(2000), DateMonth::Mar), DateDay(31));
        assert_eq!(month_days(DateYear(2000), DateMonth::Apr), DateDay(30));
        assert_eq!(month_days(DateYear(2000), DateMonth::May), DateDay(31));
        assert_eq!(month_days(DateYear(2000), DateMonth::Jun), DateDay(30));
        assert_eq!(month_days(DateYear(2000), DateMonth::Jul), DateDay(31));
        assert_eq!(month_days(DateYear(2000), DateMonth::Aug), DateDay(31));
        assert_eq!(month_days(DateYear(2000), DateMonth::Sep), DateDay(30));
        assert_eq!(month_days(DateYear(2000), DateMonth::Oct), DateDay(31));
        assert_eq!(month_days(DateYear(2000), DateMonth::Nov), DateDay(30));
        assert_eq!(month_days(DateYear(2000), DateMonth::Dec), DateDay(31));
    }

    #[test]
    fn test_month_days_february() {
        assert_eq!(month_days(DateYear(2000), DateMonth::Feb), DateDay(29));
        assert_eq!(month_days(DateYear(2004), DateMonth::Feb), DateDay(29));
        assert_eq!(month_days(DateYear(2008), DateMonth::Feb), DateDay(29));
        assert_eq!(month_days(DateYear(1900), DateMonth::Feb), DateDay(28));
        assert_eq!(month_days(DateYear(1901), DateMonth::Feb), DateDay(28));
        assert_eq!(month_days(DateYear(2001), DateMonth::Feb), DateDay(28));
        assert_eq!(month_days(DateYear(2002), DateMonth::Feb), DateDay(28));
    }

    #[test]
    fn test_days_in_year() {
        assert_eq!(days_in_year(DateYear(400)), 366);
        assert_eq!(days_in_year(DateYear(800)), 366);
        assert_eq!(days_in_year(DateYear(1200)), 366);
        assert_eq!(days_in_year(DateYear(1600)), 366);
        assert_eq!(days_in_year(DateYear(2000)), 366);
        assert_eq!(days_in_year(DateYear(2004)), 366);
        assert_eq!(days_in_year(DateYear(2008)), 366);
        assert_eq!(days_in_year(DateYear(2012)), 366);
        assert_eq!(days_in_year(DateYear(2016)), 366);
        assert_eq!(days_in_year(DateYear(2020)), 366);
        assert_eq!(days_in_year(DateYear(2024)), 366);
        assert_eq!(days_in_year(DateYear(1300)), 365);
        assert_eq!(days_in_year(DateYear(1400)), 365);
        assert_eq!(days_in_year(DateYear(1500)), 365);
        assert_eq!(days_in_year(DateYear(1700)), 365);
        assert_eq!(days_in_year(DateYear(1800)), 365);
        assert_eq!(days_in_year(DateYear(1900)), 365);
        assert_eq!(days_in_year(DateYear(1900)), 365);
        assert_eq!(days_in_year(DateYear(1901)), 365);
        assert_eq!(days_in_year(DateYear(1902)), 365);
        assert_eq!(days_in_year(DateYear(1903)), 365);
        assert_eq!(days_in_year(DateYear(2001)), 365);
        assert_eq!(days_in_year(DateYear(2002)), 365);
        assert_eq!(days_in_year(DateYear(2001)), 365);
        assert_eq!(days_in_year(DateYear(2002)), 365);
        assert_eq!(days_in_year(DateYear(2003)), 365);
    }
}
