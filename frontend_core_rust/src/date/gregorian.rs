use std::{fmt, ops};

#[derive(Debug, PartialEq)]
struct DayIntv {
    pub amount: u32,
}

impl DayIntv {
    pub fn from(amount: u32) -> Self {
        DayIntv { amount }
    }
}

#[derive(Debug, PartialEq)]
struct WeekIntv {
    pub amount: u32,
}

impl WeekIntv {
    pub fn from(amount: u32) -> Self {
        WeekIntv { amount }
    }
}

#[derive(Debug, PartialEq)]
struct MonthIntv {
    pub amount: u16,
}

impl MonthIntv {
    pub fn from(amount: u16) -> Self {
        MonthIntv { amount }
    }
}

#[derive(Debug, PartialEq)]
struct YearIntv {
    pub amount: u16,
}

impl YearIntv {
    pub fn from(amount: u16) -> Self {
        YearIntv { amount }
    }
}

#[derive(Debug, PartialEq)]
struct DateDay {
    pub d: u32,
}

impl DateDay {
    pub fn from(d: u32) -> Self {
        DateDay { d }
    }
}

#[derive(Debug, PartialEq)]
enum DateMonth {
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
    pub fn from(m: u16) -> Option<Self> {
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
}

#[derive(Debug, PartialEq)]
struct DateYear {
    pub y: u16,
}

impl DateYear {
    pub fn from(y: u16) -> Self {
        DateYear { y }
    }
}

#[derive(Debug, PartialEq)]
pub struct Date {
    pub y: u16,
    pub m: u8,
    pub d: u8,
}

impl fmt::Display for Date {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{:04}-{:02}-{:02}", self.y, self.m, self.d)
    }
}

impl Date {
    pub fn from(y: u16, m: u8, d: u8) -> Self {
        Date { y: Date(), m: Date(), d: Date() }
    }
}

fn is_leap_year(y: u16) -> bool {
    if y % 400 == 0 {
        return true;
    }
    if y % 100 == 0 {
        return false;
    }
    return y % 4 == 0;
}

fn month_days(y: u16, m: u8) -> u8 {
    match m {
        1 => 31,
        2 => {
            if is_leap_year(y) {
                29
            } else {
                28
            }
        }
        3 => 31,
        4 => 30,
        5 => 31,
        6 => 30,
        7 => 31,
        8 => 31,
        9 => 30,
        10 => 31,
        11 => 30,
        12 => 31,
        _ => 0,
    }
}

fn days_in_year(y: u16) -> u16 {
    if is_leap_year(y) {366} else { 365 }
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

#[derive(Debug, PartialEq)]
pub struct DateInterval {
    pub d: u32,
    pub w: u32,
    pub m: u16,
    pub y: u16,
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_day_intv() {
        assert_eq!(DayIntv::from(1864), DayIntv { amount: 1864 });
    }

    #[test]
    fn test_week_intv() {
        assert_eq!(WeekIntv::from(1864), WeekIntv { amount: 1864 });
    }

    #[test]
    fn test_month_intv() {
        assert_eq!(MonthIntv::from(1864), MonthIntv { amount: 1864 });
    }

    #[test]
    fn test_year_intv() {
        assert_eq!(YearIntv::from(1864), YearIntv { amount: 1864 });
    }

    #[test]
    fn test_date_day() {
        assert_eq!(DateDay::from(1864), DateDay { d: 54 });
    }

    #[test]
    fn test_date_month() {
        assert_eq!(DateMonth::from(1864), DateMonth { m: 1864 });
    }

    #[test]
    fn test_date_year() {
        assert_eq!(DateYear::from(1864), DateYear { y: 1864 });
    }

    #[test]
    fn test_date() {
        let dt = Date::from(876, 7, 4);
        assert_eq!(dt, Date { y: 876, m: 7, d: 4 });
        assert_eq!(format!("{dt}"), "0876-07-04");
    }

    #[test]
    fn test_is_leap_year_divisable_by_four() {
        assert_eq!(is_leap_year(2004), true);
        assert_eq!(is_leap_year(2008), true);
        assert_eq!(is_leap_year(2012), true);
        assert_eq!(is_leap_year(2016), true);
        assert_eq!(is_leap_year(2020), true);
        assert_eq!(is_leap_year(2024), true);
    }

    #[test]
    fn test_is_leap_year_divisable_by_one_hundred() {
        assert_eq!(is_leap_year(1300), false);
        assert_eq!(is_leap_year(1400), false);
        assert_eq!(is_leap_year(1500), false);
        assert_eq!(is_leap_year(1700), false);
        assert_eq!(is_leap_year(1800), false);
        assert_eq!(is_leap_year(1900), false);
    }

    #[test]
    fn test_is_leap_year_divisable_by_four_hundred() {
        assert_eq!(is_leap_year(400), true);
        assert_eq!(is_leap_year(800), true);
        assert_eq!(is_leap_year(1200), true);
        assert_eq!(is_leap_year(1600), true);
        assert_eq!(is_leap_year(2000), true);
    }

    #[test]
    fn test_is_leap_year_other_years() {
        assert_eq!(is_leap_year(1900), false);
        assert_eq!(is_leap_year(1901), false);
        assert_eq!(is_leap_year(1902), false);
        assert_eq!(is_leap_year(1903), false);
        assert_eq!(is_leap_year(2001), false);
        assert_eq!(is_leap_year(2002), false);
        assert_eq!(is_leap_year(2003), false);
    }  

    #[test]
    fn test_month_days_except_febrary() {
        assert_eq!(month_days(2000, 1), 31);
        assert_eq!(month_days(2000, 3), 31);
        assert_eq!(month_days(2000, 4), 30);
        assert_eq!(month_days(2000, 5), 31);
        assert_eq!(month_days(2000, 6), 30);
        assert_eq!(month_days(2000, 7), 31);
        assert_eq!(month_days(2000, 8), 31);
        assert_eq!(month_days(2000, 9), 30);
        assert_eq!(month_days(2000, 10), 31);
        assert_eq!(month_days(2000, 11), 30);
        assert_eq!(month_days(2000, 12), 31);
    }

    #[test]
    fn test_month_days_invalid_month() {
        assert_eq!(month_days(2000, 13), 0);
        assert_eq!(month_days(2000, 14), 0);
        assert_eq!(month_days(2000, 15), 0);
        assert_eq!(month_days(2000, 16), 0);
        assert_eq!(month_days(2000, 17), 0);
        assert_eq!(month_days(2000, 18), 0);
        assert_eq!(month_days(2000, 19), 0);
    }

    #[test]
    fn test_month_days_february() {
        assert_eq!(month_days(2000, 2), 29);
        assert_eq!(month_days(2004, 2), 29);
        assert_eq!(month_days(2008, 2), 29);
        assert_eq!(month_days(1900, 2), 28);
        assert_eq!(month_days(1901, 2), 28);
        assert_eq!(month_days(2001, 2), 28);
        assert_eq!(month_days(2002, 2), 28);
    }

    #[test]
    fn test_days_in_year() {
        assert_eq!(days_in_year(400), 366);
        assert_eq!(days_in_year(800), 366);
        assert_eq!(days_in_year(1200), 366);
        assert_eq!(days_in_year(1600), 366);
        assert_eq!(days_in_year(2000), 366);
        assert_eq!(days_in_year(2004), 366);
        assert_eq!(days_in_year(2008), 366);
        assert_eq!(days_in_year(2012), 366);
        assert_eq!(days_in_year(2016), 366);
        assert_eq!(days_in_year(2020), 366);
        assert_eq!(days_in_year(2024), 366);
        assert_eq!(days_in_year(1300), 365);
        assert_eq!(days_in_year(1400), 365);
        assert_eq!(days_in_year(1500), 365);
        assert_eq!(days_in_year(1700), 365);
        assert_eq!(days_in_year(1800), 365);
        assert_eq!(days_in_year(1900), 365);
        assert_eq!(days_in_year(1900), 365);
        assert_eq!(days_in_year(1901), 365);
        assert_eq!(days_in_year(1902), 365);
        assert_eq!(days_in_year(1903), 365);
        assert_eq!(days_in_year(2001), 365);
        assert_eq!(days_in_year(2002), 365);
        assert_eq!(days_in_year(2001), 365);
        assert_eq!(days_in_year(2002), 365);
        assert_eq!(days_in_year(2003), 365);
    }
}


// eu tenho um evento que se repete de um período a outro, eu tenho que encontrar as repetições dele
// nesse período.
// pra isso tem que achar a data mais próxima que se repete no período, e quais as próximas 
// ou seja operaçaõd de +1 d, +1 mes, etc