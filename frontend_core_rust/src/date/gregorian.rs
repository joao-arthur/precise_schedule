use std::{fmt, ops};

use super::interval::{MonthIntv, YearIntv};

#[derive(Debug, PartialEq)]
pub struct DtYear(pub u16);

#[derive(Debug, PartialEq)]
pub enum DtMonth {
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

impl DtMonth {
    pub fn from_u8(m: u8) -> Option<Self> {
        match m {
            1 => Some(DtMonth::Jan),
            2 => Some(DtMonth::Feb),
            3 => Some(DtMonth::Mar),
            4 => Some(DtMonth::Apr),
            5 => Some(DtMonth::May),
            6 => Some(DtMonth::Jun),
            7 => Some(DtMonth::Jul),
            8 => Some(DtMonth::Aug),
            9 => Some(DtMonth::Sep),
            10 => Some(DtMonth::Oct),
            11 => Some(DtMonth::Nov),
            12 => Some(DtMonth::Dec),
            _ => None,
        }
    }

    pub fn to_u8(self: &Self) -> u8 {
        match self {
            DtMonth::Jan => 1,
            DtMonth::Feb => 2,
            DtMonth::Mar => 3,
            DtMonth::Apr => 4,
            DtMonth::May => 5,
            DtMonth::Jun => 6,
            DtMonth::Jul => 7,
            DtMonth::Aug => 8,
            DtMonth::Sep => 9,
            DtMonth::Oct => 10,
            DtMonth::Nov => 11,
            DtMonth::Dec => 12,
        }
    }
}

#[derive(Debug, PartialEq)]
pub struct DtDay(pub u8);

#[derive(Debug, PartialEq)]
pub struct Dt {
    pub y: DtYear,
    pub m: DtMonth,
    pub d: DtDay,
}

impl fmt::Display for Dt {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{:04}-{:02}-{:02}", self.y.0, self.m.to_u8(), self.d.0)
    }
}

impl Dt {
    pub fn from(y: u16, m: u8, d: u8) -> Self {
        Dt { y: DtYear(y), m: DtMonth::from_u8(m).unwrap(), d: DtDay(d) }
    }
}

/*
impl ops::Add<DayIntv> for Dt {
    type Output = Dt;

    fn add(self, intv: DayIntv) -> Dt {
        Dt { y, m, d }
    }
}
impl ops::Sub<DayIntv> for Dt {
    type Output = Dt;

    fn sub(self, intv: DayIntv) -> Dt {
        Dt { y, m, d }
    }
}

impl ops::Add<WeekIntv> for Dt {
    type Output = Dt;

    fn add(self, intv: WeekIntv) -> Dt {
        Dt { y, m, d }
    }
}

impl ops::Sub<WeekIntv> for Dt {
    type Output = Dt;

    fn sub(self, intv: WeekIntv) -> Dt {
        Dt { y, m, d }
    }
}
*/

impl ops::Add<MonthIntv> for Dt {
    type Output = Dt;

    fn add(self, intv: MonthIntv) -> Dt {
        let sum_m = u16::from(self.y.0) * 12 + u16::from(self.m.to_u8()) - 1 + intv.0;
        let y = sum_m / 12;
        let m = sum_m - y * 12 + 1;

        Dt { y: DtYear(y), m: DtMonth::from_u8(m as u8).unwrap(), d: self.d }
    }
}

impl ops::Sub<MonthIntv> for Dt {
    type Output = Dt;

    fn sub(self, intv: MonthIntv) -> Dt {
        let sum_m = u16::from(self.y.0) * 12 + u16::from(self.m.to_u8()) - 1;
        if intv.0 > sum_m {
            return Dt::from(0, 1, 1)
        }
        let sum_m = sum_m - intv.0;
        let y = sum_m / 12;
        let m = sum_m - y * 12 + 1;

        Dt { y: DtYear(y), m: DtMonth::from_u8(m as u8).unwrap(), d: self.d }
    }
}

impl ops::Add<YearIntv> for Dt {
    type Output = Dt;

    fn add(self, intv: YearIntv) -> Dt {
        Dt { y: DtYear(self.y.0 + intv.0), m: self.m, d: self.d }
    }
}

impl ops::Sub<YearIntv> for Dt {
    type Output = Dt;

    fn sub(self, intv: YearIntv) -> Dt {
        if intv.0 > self.y.0 {
            Dt::from(0, 1, 1)
        } else {
            Dt { y: DtYear(self.y.0 - intv.0), m: self.m, d: self.d }
        }
    }
}

fn is_leap_year(y: DtYear) -> bool {
    if y.0 % 400 == 0 {
        return true;
    }
    if y.0 % 100 == 0 {
        return false;
    }
    return y.0 % 4 == 0;
}

fn days_in_month(y: DtYear, m: DtMonth) -> DtDay {
    match m {
        DtMonth::Jan => DtDay(31),
        DtMonth::Feb => {
            if is_leap_year(y) {
                DtDay(29)
            } else {
                DtDay(28)
            }
        }
        DtMonth::Mar => DtDay(31),
        DtMonth::Apr => DtDay(30),
        DtMonth::May => DtDay(31),
        DtMonth::Jun => DtDay(30),
        DtMonth::Jul => DtDay(31),
        DtMonth::Aug => DtDay(31),
        DtMonth::Sep => DtDay(30),
        DtMonth::Oct => DtDay(31),
        DtMonth::Nov => DtDay(30),
        DtMonth::Dec => DtDay(31),
    }
}

fn days_in_year(y: DtYear) -> u16 {
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
    fn test_date_month_from_u8() {
        assert_eq!(DtMonth::from_u8(0), None);
        assert_eq!(DtMonth::from_u8(1), Some(DtMonth::Jan));
        assert_eq!(DtMonth::from_u8(2), Some(DtMonth::Feb));
        assert_eq!(DtMonth::from_u8(3), Some(DtMonth::Mar));
        assert_eq!(DtMonth::from_u8(4), Some(DtMonth::Apr));
        assert_eq!(DtMonth::from_u8(5), Some(DtMonth::May));
        assert_eq!(DtMonth::from_u8(6), Some(DtMonth::Jun));
        assert_eq!(DtMonth::from_u8(7), Some(DtMonth::Jul));
        assert_eq!(DtMonth::from_u8(8), Some(DtMonth::Aug));
        assert_eq!(DtMonth::from_u8(9), Some(DtMonth::Sep));
        assert_eq!(DtMonth::from_u8(10), Some(DtMonth::Oct));
        assert_eq!(DtMonth::from_u8(11), Some(DtMonth::Nov));
        assert_eq!(DtMonth::from_u8(12), Some(DtMonth::Dec));
        assert_eq!(DtMonth::from_u8(13), None);
        assert_eq!(DtMonth::from_u8(14), None);
    }

    #[test]
    fn test_date_month_to_u8() {
        assert_eq!(DtMonth::Jan.to_u8(), 1);
        assert_eq!(DtMonth::Feb.to_u8(), 2);
        assert_eq!(DtMonth::Mar.to_u8(), 3);
        assert_eq!(DtMonth::Apr.to_u8(), 4);
        assert_eq!(DtMonth::May.to_u8(), 5);
        assert_eq!(DtMonth::Jun.to_u8(), 6);
        assert_eq!(DtMonth::Jul.to_u8(), 7);
        assert_eq!(DtMonth::Aug.to_u8(), 8);
        assert_eq!(DtMonth::Sep.to_u8(), 9);
        assert_eq!(DtMonth::Oct.to_u8(), 10);
        assert_eq!(DtMonth::Nov.to_u8(), 11);
        assert_eq!(DtMonth::Dec.to_u8(), 12);
    }

    #[test]
    fn test_date() {
        let dt = Dt::from(876, 7, 4);
        assert_eq!(dt, Dt { y: DtYear(876), m: DtMonth::Jul, d: DtDay(4) });
        assert_eq!(format!("{dt}"), "0876-07-04");
    }

    #[test]
    fn test_dt_add_year() {
        assert_eq!(Dt::from(2020, 7, 4) + YearIntv(0), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + YearIntv(1), Dt::from(2021, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + YearIntv(2), Dt::from(2022, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + YearIntv(3), Dt::from(2023, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + YearIntv(4), Dt::from(2024, 7, 4));
    }

    #[test]
    fn test_dt_sub_year() {
        assert_eq!(Dt::from(2020, 7, 4) - YearIntv(0), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2021, 7, 4) - YearIntv(1), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2022, 7, 4) - YearIntv(2), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2023, 7, 4) - YearIntv(3), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2024, 7, 4) - YearIntv(4), Dt::from(2020, 7, 4));
    }

    #[test]
    fn test_dt_add_month() {
        assert_eq!(Dt::from(2020, 7, 4) + MonthIntv(0), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + MonthIntv(1), Dt::from(2020, 8, 4));
        assert_eq!(Dt::from(2020, 7, 4) + MonthIntv(2), Dt::from(2020, 9, 4));
        assert_eq!(Dt::from(2020, 7, 4) + MonthIntv(3), Dt::from(2020, 10, 4));
        assert_eq!(Dt::from(2020, 7, 4) + MonthIntv(4), Dt::from(2020, 11, 4));
        assert_eq!(Dt::from(2020, 7, 4) + MonthIntv(5), Dt::from(2020, 12, 4));
        assert_eq!(Dt::from(2020, 7, 4) + MonthIntv(6), Dt::from(2021, 1, 4));
        assert_eq!(Dt::from(2020, 7, 4) + MonthIntv(7), Dt::from(2021, 2, 4));
        assert_eq!(Dt::from(2020, 7, 4) + MonthIntv(12), Dt::from(2021, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + MonthIntv(24), Dt::from(2022, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + MonthIntv(36), Dt::from(2023, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + MonthIntv(48), Dt::from(2024, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + MonthIntv(60), Dt::from(2025, 7, 4));
    }

    #[test]
    fn test_dt_sub_month() {
        assert_eq!(Dt::from(2020, 7, 4) - MonthIntv(0), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 8, 4) - MonthIntv(1), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 9, 4) - MonthIntv(2), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 10, 4) - MonthIntv(3), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 11, 4) - MonthIntv(4), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 12, 4) - MonthIntv(5), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2021, 1, 4) - MonthIntv(6), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2021, 2, 4) - MonthIntv(7), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2021, 7, 4) - MonthIntv(12), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2022, 7, 4) - MonthIntv(24), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2023, 7, 4) - MonthIntv(36), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2024, 7, 4) - MonthIntv(48), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2025, 7, 4) - MonthIntv(60), Dt::from(2020, 7, 4));
    }

    #[test]
    fn test_dt_sub_overflow() {
        assert_eq!(Dt::from(2024, 7, 4) - YearIntv(2024), Dt::from(0, 7, 4));
        assert_eq!(Dt::from(2024, 7, 4) - MonthIntv(2024 * 12), Dt::from(0, 7, 4));
        assert_eq!(Dt::from(2024, 7, 4) - YearIntv(2025), Dt::from(0, 1, 1));
        assert_eq!(Dt::from(2024, 7, 4) - MonthIntv(2025 * 12), Dt::from(0, 1, 1));
    }

    #[test]
    fn test_is_leap_year_divisable_by_four() {
        assert_eq!(is_leap_year(DtYear(2004)), true);
        assert_eq!(is_leap_year(DtYear(2008)), true);
        assert_eq!(is_leap_year(DtYear(2012)), true);
        assert_eq!(is_leap_year(DtYear(2016)), true);
        assert_eq!(is_leap_year(DtYear(2020)), true);
        assert_eq!(is_leap_year(DtYear(2024)), true);
    }

    #[test]
    fn test_is_leap_year_divisable_by_one_hundred() {
        assert_eq!(is_leap_year(DtYear(1300)), false);
        assert_eq!(is_leap_year(DtYear(1400)), false);
        assert_eq!(is_leap_year(DtYear(1500)), false);
        assert_eq!(is_leap_year(DtYear(1700)), false);
        assert_eq!(is_leap_year(DtYear(1800)), false);
        assert_eq!(is_leap_year(DtYear(1900)), false);
    }

    #[test]
    fn test_is_leap_year_divisable_by_four_hundred() {
        assert_eq!(is_leap_year(DtYear(400)), true);
        assert_eq!(is_leap_year(DtYear(800)), true);
        assert_eq!(is_leap_year(DtYear(1200)), true);
        assert_eq!(is_leap_year(DtYear(1600)), true);
        assert_eq!(is_leap_year(DtYear(2000)), true);
    }

    #[test]
    fn test_is_leap_year_other_years() {
        assert_eq!(is_leap_year(DtYear(1900)), false);
        assert_eq!(is_leap_year(DtYear(1901)), false);
        assert_eq!(is_leap_year(DtYear(1902)), false);
        assert_eq!(is_leap_year(DtYear(1903)), false);
        assert_eq!(is_leap_year(DtYear(2001)), false);
        assert_eq!(is_leap_year(DtYear(2002)), false);
        assert_eq!(is_leap_year(DtYear(2003)), false);
    }

    #[test]
    fn test_days_in_month_except_febrary() {
        assert_eq!(days_in_month(DtYear(2000), DtMonth::Jan), DtDay(31));
        assert_eq!(days_in_month(DtYear(2000), DtMonth::Mar), DtDay(31));
        assert_eq!(days_in_month(DtYear(2000), DtMonth::Apr), DtDay(30));
        assert_eq!(days_in_month(DtYear(2000), DtMonth::May), DtDay(31));
        assert_eq!(days_in_month(DtYear(2000), DtMonth::Jun), DtDay(30));
        assert_eq!(days_in_month(DtYear(2000), DtMonth::Jul), DtDay(31));
        assert_eq!(days_in_month(DtYear(2000), DtMonth::Aug), DtDay(31));
        assert_eq!(days_in_month(DtYear(2000), DtMonth::Sep), DtDay(30));
        assert_eq!(days_in_month(DtYear(2000), DtMonth::Oct), DtDay(31));
        assert_eq!(days_in_month(DtYear(2000), DtMonth::Nov), DtDay(30));
        assert_eq!(days_in_month(DtYear(2000), DtMonth::Dec), DtDay(31));
    }

    #[test]
    fn test_days_in_month_february() {
        assert_eq!(days_in_month(DtYear(2000), DtMonth::Feb), DtDay(29));
        assert_eq!(days_in_month(DtYear(2004), DtMonth::Feb), DtDay(29));
        assert_eq!(days_in_month(DtYear(2008), DtMonth::Feb), DtDay(29));
        assert_eq!(days_in_month(DtYear(1900), DtMonth::Feb), DtDay(28));
        assert_eq!(days_in_month(DtYear(1901), DtMonth::Feb), DtDay(28));
        assert_eq!(days_in_month(DtYear(2001), DtMonth::Feb), DtDay(28));
        assert_eq!(days_in_month(DtYear(2002), DtMonth::Feb), DtDay(28));
    }

    #[test]
    fn test_days_in_year() {
        assert_eq!(days_in_year(DtYear(400)), 366);
        assert_eq!(days_in_year(DtYear(800)), 366);
        assert_eq!(days_in_year(DtYear(1200)), 366);
        assert_eq!(days_in_year(DtYear(1600)), 366);
        assert_eq!(days_in_year(DtYear(2000)), 366);
        assert_eq!(days_in_year(DtYear(2004)), 366);
        assert_eq!(days_in_year(DtYear(2008)), 366);
        assert_eq!(days_in_year(DtYear(2012)), 366);
        assert_eq!(days_in_year(DtYear(2016)), 366);
        assert_eq!(days_in_year(DtYear(2020)), 366);
        assert_eq!(days_in_year(DtYear(2024)), 366);
        assert_eq!(days_in_year(DtYear(1300)), 365);
        assert_eq!(days_in_year(DtYear(1400)), 365);
        assert_eq!(days_in_year(DtYear(1500)), 365);
        assert_eq!(days_in_year(DtYear(1700)), 365);
        assert_eq!(days_in_year(DtYear(1800)), 365);
        assert_eq!(days_in_year(DtYear(1900)), 365);
        assert_eq!(days_in_year(DtYear(1900)), 365);
        assert_eq!(days_in_year(DtYear(1901)), 365);
        assert_eq!(days_in_year(DtYear(1902)), 365);
        assert_eq!(days_in_year(DtYear(1903)), 365);
        assert_eq!(days_in_year(DtYear(2001)), 365);
        assert_eq!(days_in_year(DtYear(2002)), 365);
        assert_eq!(days_in_year(DtYear(2001)), 365);
        assert_eq!(days_in_year(DtYear(2002)), 365);
        assert_eq!(days_in_year(DtYear(2003)), 365);
    }
}
