use std::{cmp, fmt, ops};

use super::interval::{self};

#[derive(Debug, PartialEq, Eq, Clone)]
pub struct Y(pub u16);

#[derive(Debug, PartialEq, Eq, Clone)]
pub enum M {
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

impl M {
    pub fn from_u8(m: u8) -> Option<Self> {
        match m {
            1 => Some(M::Jan),
            2 => Some(M::Feb),
            3 => Some(M::Mar),
            4 => Some(M::Apr),
            5 => Some(M::May),
            6 => Some(M::Jun),
            7 => Some(M::Jul),
            8 => Some(M::Aug),
            9 => Some(M::Sep),
            10 => Some(M::Oct),
            11 => Some(M::Nov),
            12 => Some(M::Dec),
            _ => None,
        }
    }

    pub fn to_u8(self: &Self) -> u8 {
        match self {
            M::Jan => 1,
            M::Feb => 2,
            M::Mar => 3,
            M::Apr => 4,
            M::May => 5,
            M::Jun => 6,
            M::Jul => 7,
            M::Aug => 8,
            M::Sep => 9,
            M::Oct => 10,
            M::Nov => 11,
            M::Dec => 12,
        }
    }
}

#[derive(Debug, PartialEq, Eq, Clone)]
pub struct D(pub u8);

#[derive(Debug, PartialEq, Eq, Clone)]
pub struct Dt {
    pub y: Y,
    pub m: M,
    pub d: D,
}

impl Dt {
    pub fn from(y: u16, m: u8, d: u8) -> Self {
        Dt { y: Y(y), m: M::from_u8(m).unwrap(), d: D(d) }
    }
}

impl fmt::Display for Dt {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{:04}-{:02}-{:02}", self.y.0, self.m.to_u8(), self.d.0)
    }
}

impl ops::Add<interval::Y> for Dt {
    type Output = Dt;

    fn add(self, intv: interval::Y) -> Dt {
        let y = self.y.0 + intv.0;
        let m = self.m.to_u8();
        let d = cmp::min(self.d.0, days_in_month(&Y(y), &self.m).0);
        Dt::from(y, m, d)
    }
}

impl ops::Sub<interval::Y> for Dt {
    type Output = Dt;

    fn sub(self, intv: interval::Y) -> Dt {
        if intv.0 > self.y.0 {
            return Dt::from(0, 1, 1);
        }
        let y = self.y.0 - intv.0;
        let m = self.m.to_u8();
        let d = cmp::min(self.d.0, days_in_month(&Y(y), &self.m).0);
        Dt::from(self.y.0 - intv.0, m, d)
    }
}

impl ops::Add<interval::M> for Dt {
    type Output = Dt;

    fn add(self, intv: interval::M) -> Dt {
        let mut y = self.y.0;
        let mut m = u16::from(self.m.to_u8()) - 1 + intv.0;
        while m > 11 {
            y += 1;
            m -= 12;
        }
        let d = cmp::min(self.d.0, days_in_month(&Y(y), &M::from_u8(m as u8 + 1).unwrap()).0);
        Dt::from(y, m as u8 + 1, d)
    }
}

impl ops::Sub<interval::M> for Dt {
    type Output = Dt;

    fn sub(self, intv: interval::M) -> Dt {
        let mut y = self.y.0;
        let mut m = i32::from(self.m.to_u8()) - 1 - i32::from(intv.0);
        while m < 0 {
            if y == 0 {
                return Dt::from(0, 1, 1);
            }
            y -= 1;
            m += 12;
        }
        let d = cmp::min(self.d.0, days_in_month(&Y(y), &M::from_u8(m as u8 + 1).unwrap()).0);
        Dt::from(y, m as u8 + 1, d)
    }
}

impl ops::Add<interval::D> for Dt {
    type Output = Dt;

    fn add(self, intv: interval::D) -> Dt {
        let mut y = self.y.0;
        let mut m = self.m.to_u8() - 1;
        let mut d = u32::from(self.d.0) - 1 + intv.0;
        let mut m_days = u32::from(days_in_month(&Y(y), &M::from_u8(m as u8 + 1).unwrap()).0);
        while d >= m_days {
            m += 1;
            d -= m_days;
            if m > 11 {
                y += 1;
                m -= 12;
            }
            m_days = u32::from(days_in_month(&Y(y), &M::from_u8(m as u8 + 1).unwrap()).0);
        }
        Dt::from(y, m as u8 + 1, d as u8 + 1)
    }
}

impl ops::Sub<interval::D> for Dt {
    type Output = Dt;

    fn sub(self, intv: interval::D) -> Dt {
        let mut y = self.y.0;
        let mut m = i32::from(self.m.to_u8() - 1);
        let mut d = i64::from(self.d.0) - 1 - i64::from(intv.0);
        while d < 0 {
            m -= 1;
            if m < 0 {
                if y == 0 {
                    return Dt::from(0, 1, 1);
                }
                y -= 1;
                m += 12;
            }
            let m_days = i64::from(days_in_month(&Y(y), &M::from_u8(m as u8 + 1).unwrap()).0);
            d += m_days;
        }
        Dt::from(y, m as u8 + 1, d as u8 + 1)
    }
}

impl ops::Add<interval::W> for Dt {
    type Output = Dt;

    fn add(self, intv: interval::W) -> Dt {
        self + interval::D(intv.0 * 7)
    }
}

impl ops::Sub<interval::W> for Dt {
    type Output = Dt;

    fn sub(self, intv: interval::W) -> Dt {
        self - interval::D(intv.0 * 7)
    }
}

impl Ord for Dt {
    fn cmp(&self, other: &Self) -> cmp::Ordering {
        self.y.0
            .cmp(&other.y.0)
            .then(self.m.to_u8().cmp(&other.m.to_u8()))
            .then(self.d.0.cmp(&other.d.0))
    }
}

impl PartialOrd for Dt {
    fn partial_cmp(&self, other: &Self) -> Option<cmp::Ordering> {
        Some(self.cmp(other))
    }
}

fn is_leap_year(y: &Y) -> bool {
    if y.0 % 400 == 0 {
        return true;
    }
    if y.0 % 100 == 0 {
        return false;
    }
    return y.0 % 4 == 0;
}

fn days_in_month(y: &Y, m: &M) -> D {
    match m {
        M::Jan => D(31),
        M::Feb => {
            if is_leap_year(y) {
                D(29)
            } else {
                D(28)
            }
        }
        M::Mar => D(31),
        M::Apr => D(30),
        M::May => D(31),
        M::Jun => D(30),
        M::Jul => D(31),
        M::Aug => D(31),
        M::Sep => D(30),
        M::Oct => D(31),
        M::Nov => D(30),
        M::Dec => D(31),
    }
}

fn days_in_year(y: &Y) -> interval::D {
    interval::D(if is_leap_year(y) {
        366
    } else {
        365
    })
}

fn days_to_end_of_month(dt: &Dt) -> interval::D {
    interval::D(u32::from(days_in_month(&dt.y, &dt.m).0) - u32::from(dt.d.0))
}

fn days_to_end_of_year(dt: &Dt) -> interval::D {
    let m = dt.m.to_u8();
    let mut acc: u32 = days_to_end_of_month(dt).0;
    for curr_m in m..12 {
        acc += u32::from(days_in_month(&dt.y, &M::from_u8(curr_m + 1).unwrap()).0);
    }
    interval::D(acc)
}

fn leap_years_between(a: &Y, b: &Y) -> u16 {
    let mut acc: u16 = 0;
    let mut y = a.0;
    let rest = y % 4;
    if rest != 0 {
        y += 4 - y % 4;
    }
    while y <= b.0 {
        let dt_year = Y(y);
        if is_leap_year(&dt_year) {
            acc += 1;
        }
        y += 4;
    }
    acc
}

pub fn intv_between(a: &Dt, b: &Dt) -> interval::Dt {
    let mut y = b.y.0 - a.y.0;
    if y > 0 && ((b.m.to_u8() < a.m.to_u8()) || (b.m.to_u8() == a.m.to_u8() && b.d.0 < a.d.0)) {
        y -= 1;
    }
    let mut m = ((b.y.0 as i16 * 12 + b.m.to_u8() as i16)- (a.y.0 as i16 * 12 + a.m.to_u8() as i16)) as u16;
    if m > 0 && b.d.0 < a.d.0 {
        m -= 1;
    }
    let d: u32 = 100;
    let w: u32 = 100 / 7;

    interval::Dt { y: interval::Y(y), m: interval::M(m), w: interval::W(w), d: interval::D(d) }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_date_month_from_u8() {
        assert_eq!(M::from_u8(0), None);
        assert_eq!(M::from_u8(1), Some(M::Jan));
        assert_eq!(M::from_u8(2), Some(M::Feb));
        assert_eq!(M::from_u8(3), Some(M::Mar));
        assert_eq!(M::from_u8(4), Some(M::Apr));
        assert_eq!(M::from_u8(5), Some(M::May));
        assert_eq!(M::from_u8(6), Some(M::Jun));
        assert_eq!(M::from_u8(7), Some(M::Jul));
        assert_eq!(M::from_u8(8), Some(M::Aug));
        assert_eq!(M::from_u8(9), Some(M::Sep));
        assert_eq!(M::from_u8(10), Some(M::Oct));
        assert_eq!(M::from_u8(11), Some(M::Nov));
        assert_eq!(M::from_u8(12), Some(M::Dec));
        assert_eq!(M::from_u8(13), None);
        assert_eq!(M::from_u8(14), None);
    }

    #[test]
    fn test_date_month_to_u8() {
        assert_eq!(M::Jan.to_u8(), 1);
        assert_eq!(M::Feb.to_u8(), 2);
        assert_eq!(M::Mar.to_u8(), 3);
        assert_eq!(M::Apr.to_u8(), 4);
        assert_eq!(M::May.to_u8(), 5);
        assert_eq!(M::Jun.to_u8(), 6);
        assert_eq!(M::Jul.to_u8(), 7);
        assert_eq!(M::Aug.to_u8(), 8);
        assert_eq!(M::Sep.to_u8(), 9);
        assert_eq!(M::Oct.to_u8(), 10);
        assert_eq!(M::Nov.to_u8(), 11);
        assert_eq!(M::Dec.to_u8(), 12);
    }

    #[test]
    fn test_date() {
        let dt = Dt::from(876, 7, 4);
        assert_eq!(dt, Dt { y: Y(876), m: M::Jul, d: D(4) });
        assert_eq!(format!("{dt}"), "0876-07-04");
    }

    #[test]
    fn test_dt_add_year() {
        assert_eq!(Dt::from(2020, 7, 4) + interval::Y(0), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::Y(1), Dt::from(2021, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::Y(2), Dt::from(2022, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::Y(3), Dt::from(2023, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::Y(4), Dt::from(2024, 7, 4));
    }

    #[test]
    fn test_dt_sub_year() {
        assert_eq!(Dt::from(2020, 7, 4) - interval::Y(0), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2021, 7, 4) - interval::Y(1), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2022, 7, 4) - interval::Y(2), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2023, 7, 4) - interval::Y(3), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2024, 7, 4) - interval::Y(4), Dt::from(2020, 7, 4));
    }

    #[test]
    fn test_dt_add_month() {
        assert_eq!(Dt::from(2020, 7, 4) + interval::M(0), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::M(1), Dt::from(2020, 8, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::M(2), Dt::from(2020, 9, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::M(3), Dt::from(2020, 10, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::M(4), Dt::from(2020, 11, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::M(5), Dt::from(2020, 12, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::M(6), Dt::from(2021, 1, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::M(7), Dt::from(2021, 2, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::M(12), Dt::from(2021, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::M(24), Dt::from(2022, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::M(36), Dt::from(2023, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::M(48), Dt::from(2024, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::M(60), Dt::from(2025, 7, 4));
    }

    #[test]
    fn test_dt_sub_month() {
        assert_eq!(Dt::from(2020, 7, 4) - interval::M(0), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 8, 4) - interval::M(1), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 9, 4) - interval::M(2), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 10, 4) - interval::M(3), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 11, 4) - interval::M(4), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 12, 4) - interval::M(5), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2021, 1, 4) - interval::M(6), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2021, 2, 4) - interval::M(7), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2021, 7, 4) - interval::M(12), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2022, 7, 4) - interval::M(24), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2023, 7, 4) - interval::M(36), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2024, 7, 4) - interval::M(48), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2025, 7, 4) - interval::M(60), Dt::from(2020, 7, 4));
    }

    #[test]
    fn test_dt_add_week() {
        assert_eq!(Dt::from(2020, 7, 4) + interval::W(0), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::W(1), Dt::from(2020, 7, 11));
        assert_eq!(Dt::from(2020, 7, 4) + interval::W(2), Dt::from(2020, 7, 18));
        assert_eq!(Dt::from(2020, 7, 4) + interval::W(3), Dt::from(2020, 7, 25));
        assert_eq!(Dt::from(2020, 7, 4) + interval::W(4), Dt::from(2020, 8, 1));
        assert_eq!(Dt::from(2020, 7, 4) + interval::W(5), Dt::from(2020, 8, 8));
        assert_eq!(Dt::from(2020, 7, 4) + interval::W(10), Dt::from(2020, 9, 12));
        assert_eq!(Dt::from(2020, 7, 4) + interval::W(20), Dt::from(2020, 11, 21));
        assert_eq!(Dt::from(2020, 7, 4) + interval::W(30), Dt::from(2021, 1, 30));
        assert_eq!(Dt::from(2020, 7, 4) + interval::W(40), Dt::from(2021, 4, 10));
        assert_eq!(Dt::from(2020, 7, 4) + interval::W(50), Dt::from(2021, 6, 19));
        assert_eq!(Dt::from(2020, 7, 4) + interval::W(52), Dt::from(2021, 7, 3));
    }

    #[test]
    fn test_dt_sub_week() {
        assert_eq!(Dt::from(2020, 7, 4) - interval::W(0), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 7, 11) - interval::W(1), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 7, 18) - interval::W(2), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 7, 25) - interval::W(3), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 8, 1) - interval::W(4), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 8, 8) - interval::W(5), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 9, 12) - interval::W(10), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 11, 21) - interval::W(20), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2021, 1, 30) - interval::W(30), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2021, 4, 10) - interval::W(40), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2021, 6, 19) - interval::W(50), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2021, 7, 3) - interval::W(52), Dt::from(2020, 7, 4));
    }

    #[test]
    fn test_dt_add_day() {
        assert_eq!(Dt::from(2020, 7, 4) + interval::D(0), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::D(1), Dt::from(2020, 7, 5));
        assert_eq!(Dt::from(2020, 7, 4) + interval::D(10), Dt::from(2020, 7, 14));
        assert_eq!(Dt::from(2020, 7, 4) + interval::D(20), Dt::from(2020, 7, 24));
        assert_eq!(Dt::from(2020, 7, 4) + interval::D(21), Dt::from(2020, 7, 25));
        assert_eq!(Dt::from(2020, 7, 4) + interval::D(22), Dt::from(2020, 7, 26));
        assert_eq!(Dt::from(2020, 7, 4) + interval::D(23), Dt::from(2020, 7, 27));
        assert_eq!(Dt::from(2020, 7, 4) + interval::D(24), Dt::from(2020, 7, 28));
        assert_eq!(Dt::from(2020, 7, 4) + interval::D(25), Dt::from(2020, 7, 29));
        assert_eq!(Dt::from(2020, 7, 4) + interval::D(26), Dt::from(2020, 7, 30));
        assert_eq!(Dt::from(2020, 7, 4) + interval::D(27), Dt::from(2020, 7, 31));
        assert_eq!(Dt::from(2020, 7, 4) + interval::D(28), Dt::from(2020, 8, 1));
        assert_eq!(Dt::from(2020, 7, 4) + interval::D(29), Dt::from(2020, 8, 2));
        assert_eq!(Dt::from(2020, 7, 4) + interval::D(30), Dt::from(2020, 8, 3));
        assert_eq!(Dt::from(2020, 7, 4) + interval::D(31), Dt::from(2020, 8, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::D(62), Dt::from(2020, 9, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::D(92), Dt::from(2020, 10, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::D(365), Dt::from(2021, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::D(365 * 2), Dt::from(2022, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::D(365 * 3), Dt::from(2023, 7, 4));
        assert_eq!(Dt::from(2020, 7, 4) + interval::D(365 * 4), Dt::from(2024, 7, 3));
    }

    #[test]
    fn test_dt_sub_day() {
        assert_eq!(Dt::from(2020, 7, 4) - interval::D(0), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 7, 5) - interval::D(1), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 7, 14) - interval::D(10), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 7, 24) - interval::D(20), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 7, 25) - interval::D(21), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 7, 26) - interval::D(22), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 7, 27) - interval::D(23), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 7, 28) - interval::D(24), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 7, 29) - interval::D(25), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 7, 30) - interval::D(26), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 7, 31) - interval::D(27), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 8, 1) - interval::D(28), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 8, 2) - interval::D(29), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 8, 3) - interval::D(30), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 8, 4) - interval::D(31), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 9, 4) - interval::D(62), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2020, 10, 4) - interval::D(92), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2021, 7, 4) - interval::D(365), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2022, 7, 4) - interval::D(365 * 2), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2023, 7, 4) - interval::D(365 * 3), Dt::from(2020, 7, 4));
        assert_eq!(Dt::from(2024, 7, 3) - interval::D(365 * 4), Dt::from(2020, 7, 4));
    }

    #[test]
    fn test_dt_sub_y0() {
        assert_eq!(Dt::from(2024, 7, 4) - interval::Y(2024), Dt::from(0, 7, 4));
        assert_eq!(Dt::from(2024, 7, 4) - interval::M(2024 * 12), Dt::from(0, 7, 4));
        assert_eq!(Dt::from(2024, 7, 4) - interval::W((2024 * 52) + 359), Dt::from(0, 7, 6));
        assert_eq!(Dt::from(2024, 7, 4) - interval::D(2024 * 365 + 491), Dt::from(0, 7, 4));
    }

    #[test]
    fn test_dt_end_of_month() {
        assert_eq!(Dt::from(2024, 2, 29) + interval::Y(1), Dt::from(2025, 2, 28));
        assert_eq!(Dt::from(2024, 2, 29) - interval::Y(1), Dt::from(2023, 2, 28));
        assert_eq!(Dt::from(2024, 2, 29) + interval::M(12), Dt::from(2025, 2, 28));
        assert_eq!(Dt::from(2024, 2, 29) - interval::M(12), Dt::from(2023, 2, 28));
        assert_eq!(Dt::from(2025, 10, 31) + interval::M(1), Dt::from(2025, 11, 30));
        assert_eq!(Dt::from(2025, 10, 31) - interval::M(1), Dt::from(2025, 9, 30));
    }

    #[test]
    fn test_dt_sub_overflow() {
        assert_eq!(Dt::from(2024, 7, 4) - interval::Y(2025), Dt::from(0, 1, 1));
        assert_eq!(Dt::from(2024, 7, 4) - interval::M(2025 * 12), Dt::from(0, 1, 1));
        assert_eq!(Dt::from(2024, 7, 4) - interval::W((2025 * 52) + 500), Dt::from(0, 1, 1));
        assert_eq!(Dt::from(2024, 7, 4) - interval::D(2025 * 365 + 491), Dt::from(0, 1, 1));
    }

    #[test]
    fn test_dt_comp() {
        assert_eq!(Dt::from(2024, 7, 4) > Dt::from(2024, 7, 3), true);
        assert_eq!(Dt::from(2024, 7, 4) > Dt::from(2024, 6, 4), true);
        assert_eq!(Dt::from(2024, 7, 4) > Dt::from(2023, 7, 4), true);
        assert_eq!(Dt::from(2024, 7, 4) < Dt::from(2024, 7, 5), true);
        assert_eq!(Dt::from(2024, 7, 4) < Dt::from(2024, 8, 4), true);
        assert_eq!(Dt::from(2024, 7, 4) < Dt::from(2025, 7, 4), true);
        assert_eq!(Dt::from(2024, 7, 4) == Dt::from(2024, 7, 4), true);
        assert_eq!(Dt::from(2024, 7, 4) >= Dt::from(2024, 7, 4), true);
        assert_eq!(Dt::from(2024, 7, 4) <= Dt::from(2024, 7, 4), true);
    }

    #[test]
    fn test_is_leap_year_divisable_by_four() {
        assert_eq!(is_leap_year(&Y(2004)), true);
        assert_eq!(is_leap_year(&Y(2008)), true);
        assert_eq!(is_leap_year(&Y(2012)), true);
        assert_eq!(is_leap_year(&Y(2016)), true);
        assert_eq!(is_leap_year(&Y(2020)), true);
        assert_eq!(is_leap_year(&Y(2024)), true);
    }

    #[test]
    fn test_is_leap_year_divisable_by_one_hundred() {
        assert_eq!(is_leap_year(&Y(1300)), false);
        assert_eq!(is_leap_year(&Y(1400)), false);
        assert_eq!(is_leap_year(&Y(1500)), false);
        assert_eq!(is_leap_year(&Y(1700)), false);
        assert_eq!(is_leap_year(&Y(1800)), false);
        assert_eq!(is_leap_year(&Y(1900)), false);
    }

    #[test]
    fn test_is_leap_year_divisable_by_four_hundred() {
        assert_eq!(is_leap_year(&Y(400)), true);
        assert_eq!(is_leap_year(&Y(800)), true);
        assert_eq!(is_leap_year(&Y(1200)), true);
        assert_eq!(is_leap_year(&Y(1600)), true);
        assert_eq!(is_leap_year(&Y(2000)), true);
    }

    #[test]
    fn test_is_leap_year_other_years() {
        assert_eq!(is_leap_year(&Y(1900)), false);
        assert_eq!(is_leap_year(&Y(1901)), false);
        assert_eq!(is_leap_year(&Y(1902)), false);
        assert_eq!(is_leap_year(&Y(1903)), false);
        assert_eq!(is_leap_year(&Y(2001)), false);
        assert_eq!(is_leap_year(&Y(2002)), false);
        assert_eq!(is_leap_year(&Y(2003)), false);
    }

    #[test]
    fn test_days_in_month_except_febrary() {
        assert_eq!(days_in_month(&Y(2000), &M::Jan), D(31));
        assert_eq!(days_in_month(&Y(2000), &M::Mar), D(31));
        assert_eq!(days_in_month(&Y(2000), &M::Apr), D(30));
        assert_eq!(days_in_month(&Y(2000), &M::May), D(31));
        assert_eq!(days_in_month(&Y(2000), &M::Jun), D(30));
        assert_eq!(days_in_month(&Y(2000), &M::Jul), D(31));
        assert_eq!(days_in_month(&Y(2000), &M::Aug), D(31));
        assert_eq!(days_in_month(&Y(2000), &M::Sep), D(30));
        assert_eq!(days_in_month(&Y(2000), &M::Oct), D(31));
        assert_eq!(days_in_month(&Y(2000), &M::Nov), D(30));
        assert_eq!(days_in_month(&Y(2000), &M::Dec), D(31));
    }

    #[test]
    fn test_days_in_month_february() {
        assert_eq!(days_in_month(&Y(2000), &M::Feb), D(29));
        assert_eq!(days_in_month(&Y(2004), &M::Feb), D(29));
        assert_eq!(days_in_month(&Y(2008), &M::Feb), D(29));
        assert_eq!(days_in_month(&Y(1900), &M::Feb), D(28));
        assert_eq!(days_in_month(&Y(1901), &M::Feb), D(28));
        assert_eq!(days_in_month(&Y(2001), &M::Feb), D(28));
        assert_eq!(days_in_month(&Y(2002), &M::Feb), D(28));
    }

    #[test]
    fn test_days_in_year() {
        assert_eq!(days_in_year(&Y(400)), interval::D(366));
        assert_eq!(days_in_year(&Y(800)), interval::D(366));
        assert_eq!(days_in_year(&Y(1200)), interval::D(366));
        assert_eq!(days_in_year(&Y(1600)), interval::D(366));
        assert_eq!(days_in_year(&Y(2000)), interval::D(366));
        assert_eq!(days_in_year(&Y(2004)), interval::D(366));
        assert_eq!(days_in_year(&Y(2008)), interval::D(366));
        assert_eq!(days_in_year(&Y(2012)), interval::D(366));
        assert_eq!(days_in_year(&Y(2016)), interval::D(366));
        assert_eq!(days_in_year(&Y(2020)), interval::D(366));
        assert_eq!(days_in_year(&Y(2024)), interval::D(366));
        assert_eq!(days_in_year(&Y(1300)), interval::D(365));
        assert_eq!(days_in_year(&Y(1400)), interval::D(365));
        assert_eq!(days_in_year(&Y(1500)), interval::D(365));
        assert_eq!(days_in_year(&Y(1700)), interval::D(365));
        assert_eq!(days_in_year(&Y(1800)), interval::D(365));
        assert_eq!(days_in_year(&Y(1900)), interval::D(365));
        assert_eq!(days_in_year(&Y(1900)), interval::D(365));
        assert_eq!(days_in_year(&Y(1901)), interval::D(365));
        assert_eq!(days_in_year(&Y(1902)), interval::D(365));
        assert_eq!(days_in_year(&Y(1903)), interval::D(365));
        assert_eq!(days_in_year(&Y(2001)), interval::D(365));
        assert_eq!(days_in_year(&Y(2002)), interval::D(365));
        assert_eq!(days_in_year(&Y(2001)), interval::D(365));
        assert_eq!(days_in_year(&Y(2002)), interval::D(365));
        assert_eq!(days_in_year(&Y(2003)), interval::D(365));
    }

    #[test]
    fn test_leap_years_between_0() {
        assert_eq!(leap_years_between(&Y(1897), &Y(1903)), 0);
        assert_eq!(leap_years_between(&Y(2001), &Y(2001)), 0);
        assert_eq!(leap_years_between(&Y(2002), &Y(2002)), 0);
        assert_eq!(leap_years_between(&Y(2003), &Y(2003)), 0);
        assert_eq!(leap_years_between(&Y(2001), &Y(2003)), 0);
        assert_eq!(leap_years_between(&Y(2002), &Y(2003)), 0);
        assert_eq!(leap_years_between(&Y(2001), &Y(2002)), 0);
    }

    #[test]
    fn test_leap_years_between_1() {
        assert_eq!(leap_years_between(&Y(1897), &Y(1904)), 1);
        assert_eq!(leap_years_between(&Y(1997), &Y(2003)), 1);
        assert_eq!(leap_years_between(&Y(1997), &Y(2000)), 1);
        assert_eq!(leap_years_between(&Y(2000), &Y(2003)), 1);
        assert_eq!(leap_years_between(&Y(2003), &Y(2007)), 1);
        assert_eq!(leap_years_between(&Y(2005), &Y(2009)), 1);
    }

    #[test]
    fn test_leap_years_between_2() {
        assert_eq!(leap_years_between(&Y(1896), &Y(1904)), 2);
        assert_eq!(leap_years_between(&Y(1996), &Y(2003)), 2);
        assert_eq!(leap_years_between(&Y(1997), &Y(2004)), 2);
        assert_eq!(leap_years_between(&Y(2000), &Y(2004)), 2);
        assert_eq!(leap_years_between(&Y(2004), &Y(2008)), 2);
    }

    #[test]
    fn test_leap_years_between() {
        assert_eq!(leap_years_between(&Y(2000), &Y(2024)), 7);
    }

    #[test]
    fn test_interval_between_1() {
        assert_eq!(intv_between(&Dt::from(2024, 11, 25), &Dt::from(2024, 11, 26)), interval::Dt::from(0, 0, 0, 1));
        assert_eq!(intv_between(&Dt::from(2024, 11, 19), &Dt::from(2024, 11, 26)), interval::Dt::from(0, 0, 1, 7));
        assert_eq!(intv_between(&Dt::from(2024, 10, 26), &Dt::from(2024, 11, 26)), interval::Dt::from(0, 1, 4, 31));
        assert_eq!(intv_between(&Dt::from(2023, 11, 26), &Dt::from(2024, 11, 26)), interval::Dt::from(1, 12, 52, 366));
    }

    #[test]
    fn test_interval_between_0() {
        assert_eq!(intv_between(&Dt::from(2024, 11, 26), &Dt::from(2024, 11, 26)), interval::Dt::from(0, 0, 0, 0));
        assert_eq!(intv_between(&Dt::from(2024, 11, 20), &Dt::from(2024, 11, 26)), interval::Dt::from(0, 0, 0, 6));
        assert_eq!(intv_between(&Dt::from(2024, 10, 29), &Dt::from(2024, 11, 26)), interval::Dt::from(0, 0, 4, 28));
        assert_eq!(intv_between(&Dt::from(2024, 10, 27), &Dt::from(2024, 11, 26)), interval::Dt::from(0, 0, 4, 30));
        assert_eq!(intv_between(&Dt::from(2023, 11, 27), &Dt::from(2024, 11, 26)), interval::Dt::from(0, 11, 52, 365));
    }

    #[test]
    fn test_interval_between_big_distance() {
        assert_eq!(intv_between(&Dt::from(1984, 01, 01), &Dt::from(2039, 12, 31)), interval::Dt::from(55, 671, 2921, 20453));
    }
}
