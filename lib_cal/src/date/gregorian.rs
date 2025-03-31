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
    pub fn of(y: u16, m: u8, d: u8) -> Self {
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
        let d = cmp::min(self.d.0, m_days(&Y(y), &self.m).0);
        Dt::of(y, m, d)
    }
}

impl ops::Sub<interval::Y> for Dt {
    type Output = Dt;

    fn sub(self, intv: interval::Y) -> Dt {
        if intv.0 > self.y.0 {
            return Dt::of(0000, 01, 01);
        }
        let y = self.y.0 - intv.0;
        let m = self.m.to_u8();
        let d = cmp::min(self.d.0, m_days(&Y(y), &self.m).0);
        Dt::of(self.y.0 - intv.0, m, d)
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
        let d = cmp::min(self.d.0, m_days(&Y(y), &M::from_u8(m as u8 + 1).unwrap()).0);
        Dt::of(y, m as u8 + 1, d)
    }
}

impl ops::Sub<interval::M> for Dt {
    type Output = Dt;

    fn sub(self, intv: interval::M) -> Dt {
        let mut y = self.y.0;
        let mut m = i32::from(self.m.to_u8()) - 1 - i32::from(intv.0);
        while m < 0 {
            if y == 0 {
                return Dt::of(0000, 01, 01);
            }
            y -= 1;
            m += 12;
        }
        let d = cmp::min(self.d.0, m_days(&Y(y), &M::from_u8(m as u8 + 1).unwrap()).0);
        Dt::of(y, m as u8 + 1, d)
    }
}

impl ops::Add<interval::D> for Dt {
    type Output = Dt;

    fn add(self, intv: interval::D) -> Dt {
        let mut y = self.y.0;
        let mut m = self.m.to_u8() - 1;
        let mut d = u32::from(self.d.0) - 1 + intv.0;
        let mut md = u32::from(m_days(&Y(y), &M::from_u8(m as u8 + 1).unwrap()).0);
        while d >= md {
            m += 1;
            d -= md;
            if m > 11 {
                y += 1;
                m -= 12;
            }
            md = u32::from(m_days(&Y(y), &M::from_u8(m as u8 + 1).unwrap()).0);
        }
        Dt::of(y, m as u8 + 1, d as u8 + 1)
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
                    return Dt::of(0000, 01, 01);
                }
                y -= 1;
                m += 12;
            }
            let md = i64::from(m_days(&Y(y), &M::from_u8(m as u8 + 1).unwrap()).0);
            d += md;
        }
        Dt::of(y, m as u8 + 1, d as u8 + 1)
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
        self.y.0.cmp(&other.y.0).then(self.m.to_u8().cmp(&other.m.to_u8())).then(self.d.0.cmp(&other.d.0))
    }
}

impl PartialOrd for Dt {
    fn partial_cmp(&self, other: &Self) -> Option<cmp::Ordering> {
        Some(self.cmp(other))
    }
}

fn y_is_leap(y: &Y) -> bool {
    if y.0 % 400 == 0 {
        return true;
    }
    if y.0 % 100 == 0 {
        return false;
    }
    return y.0 % 4 == 0;
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
        if y_is_leap(&dt_year) {
            acc += 1;
        }
        y += 4;
    }
    acc
}

fn y_days(y: &Y) -> interval::D {
    interval::D(if y_is_leap(y) { 366 } else { 365 })
}

fn m_days(y: &Y, m: &M) -> D {
    match m {
        M::Jan => D(31),
        M::Feb => {
            if y_is_leap(y) {
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

fn m_days_off_end(dt: &Dt) -> interval::D {
    interval::D(u32::from(m_days(&dt.y, &dt.m).0) - u32::from(dt.d.0))
}

fn y_days_off_end(dt: &Dt) -> interval::D {
    let m = dt.m.to_u8();
    let mut acc = m_days_off_end(dt).0;
    for curr_m in (m + 1)..13 {
        acc += u32::from(m_days(&dt.y, &M::from_u8(curr_m).unwrap()).0);
    }
    interval::D(acc)
}

fn y_days_off_begin(dt: &Dt) -> interval::D {
    let m = dt.m.to_u8();
    let mut acc = u32::from(dt.d.0) - 1;
    for curr_m in 1..m {
        acc += u32::from(m_days(&dt.y, &M::from_u8(curr_m).unwrap()).0);
    }
    interval::D(acc)
}

fn y_intv(a: &Dt, b: &Dt) -> interval::Y {
    let mut y = b.y.0 - a.y.0;
    if y > 0 && ((b.m.to_u8() < a.m.to_u8()) || (b.m.to_u8() == a.m.to_u8() && b.d.0 < a.d.0)) {
        y -= 1;
    }
    interval::Y(y)
}

fn m_intv(a: &Dt, b: &Dt) -> interval::M {
    let b_m = b.y.0 as i16 * 12 + b.m.to_u8() as i16;
    let a_m = a.y.0 as i16 * 12 + a.m.to_u8() as i16;
    let mut m = (b_m - a_m).unsigned_abs();
    if m > 0 && b.d.0 < a.d.0 {
        m -= 1;
    }
    interval::M(m)
}

fn w_intv(a: &Dt, b: &Dt) -> interval::W {
    interval::W(d_intv(a, b).0 / 7)
}

fn d_intv(a: &Dt, b: &Dt) -> interval::D {
    let a_y = a.y.0;
    let b_y = b.y.0;
    let diff_y = b_y - a_y;
    if diff_y == 0 {
        return interval::D(y_days(&b.y).0 - y_days_off_end(b).0 - y_days_off_begin(a).0 - 1);
    }
    if diff_y == 1 {
        return interval::D(y_days_off_end(a).0 + y_days_off_begin(b).0 + 1);
    }
    let mut acc_y: u32 = 0;
    for curr_y in (a_y + 1)..b_y {
        acc_y += y_days(&Y(curr_y)).0;
    }
    return interval::D(y_days_off_end(a).0 + acc_y + y_days_off_begin(b).0 + 1);
}

pub fn intv_between(a: &Dt, b: &Dt) -> interval::Dt {
    interval::Dt { y: y_intv(a, b), m: m_intv(a, b), w: w_intv(a, b), d: d_intv(a, b) }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_date_m_from_u8() {
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
    fn test_date_m_to_u8() {
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
        let dt = Dt::of(0876, 07, 04);
        assert_eq!(dt, Dt { y: Y(876), m: M::Jul, d: D(4) });
        assert_eq!(format!("{dt}"), "0876-07-04");
    }

    #[test]
    fn test_dt_add_year() {
        assert_eq!(Dt::of(2020, 07, 04) + interval::Y(0), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::Y(1), Dt::of(2021, 07, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::Y(2), Dt::of(2022, 07, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::Y(3), Dt::of(2023, 07, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::Y(4), Dt::of(2024, 07, 04));
    }

    #[test]
    fn test_dt_sub_year() {
        assert_eq!(Dt::of(2020, 07, 04) - interval::Y(0), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2021, 07, 04) - interval::Y(1), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2022, 07, 04) - interval::Y(2), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2023, 07, 04) - interval::Y(3), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2024, 07, 04) - interval::Y(4), Dt::of(2020, 07, 04));
    }

    #[test]
    fn test_dt_add_month() {
        assert_eq!(Dt::of(2020, 07, 04) + interval::M(0), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::M(1), Dt::of(2020, 08, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::M(2), Dt::of(2020, 09, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::M(3), Dt::of(2020, 10, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::M(4), Dt::of(2020, 11, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::M(5), Dt::of(2020, 12, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::M(6), Dt::of(2021, 01, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::M(7), Dt::of(2021, 02, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::M(12), Dt::of(2021, 07, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::M(24), Dt::of(2022, 07, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::M(36), Dt::of(2023, 07, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::M(48), Dt::of(2024, 07, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::M(60), Dt::of(2025, 07, 04));
    }

    #[test]
    fn test_dt_sub_month() {
        assert_eq!(Dt::of(2020, 07, 04) - interval::M(0), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 08, 04) - interval::M(1), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 09, 04) - interval::M(2), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 10, 04) - interval::M(3), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 11, 04) - interval::M(4), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 12, 04) - interval::M(5), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2021, 01, 04) - interval::M(6), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2021, 02, 04) - interval::M(7), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2021, 07, 04) - interval::M(12), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2022, 07, 04) - interval::M(24), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2023, 07, 04) - interval::M(36), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2024, 07, 04) - interval::M(48), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2025, 07, 04) - interval::M(60), Dt::of(2020, 07, 04));
    }

    #[test]
    fn test_dt_add_week() {
        assert_eq!(Dt::of(2020, 07, 04) + interval::W(0), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::W(1), Dt::of(2020, 07, 11));
        assert_eq!(Dt::of(2020, 07, 04) + interval::W(2), Dt::of(2020, 07, 18));
        assert_eq!(Dt::of(2020, 07, 04) + interval::W(3), Dt::of(2020, 07, 25));
        assert_eq!(Dt::of(2020, 07, 04) + interval::W(4), Dt::of(2020, 08, 01));
        assert_eq!(Dt::of(2020, 07, 04) + interval::W(5), Dt::of(2020, 08, 08));
        assert_eq!(Dt::of(2020, 07, 04) + interval::W(10), Dt::of(2020, 09, 12));
        assert_eq!(Dt::of(2020, 07, 04) + interval::W(20), Dt::of(2020, 11, 21));
        assert_eq!(Dt::of(2020, 07, 04) + interval::W(30), Dt::of(2021, 01, 30));
        assert_eq!(Dt::of(2020, 07, 04) + interval::W(40), Dt::of(2021, 04, 10));
        assert_eq!(Dt::of(2020, 07, 04) + interval::W(50), Dt::of(2021, 06, 19));
        assert_eq!(Dt::of(2020, 07, 04) + interval::W(52), Dt::of(2021, 07, 03));
    }

    #[test]
    fn test_dt_sub_week() {
        assert_eq!(Dt::of(2020, 07, 04) - interval::W(0), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 07, 11) - interval::W(1), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 07, 18) - interval::W(2), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 07, 25) - interval::W(3), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 08, 01) - interval::W(4), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 08, 08) - interval::W(5), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 09, 12) - interval::W(10), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 11, 21) - interval::W(20), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2021, 01, 30) - interval::W(30), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2021, 04, 10) - interval::W(40), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2021, 06, 19) - interval::W(50), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2021, 07, 03) - interval::W(52), Dt::of(2020, 07, 04));
    }

    #[test]
    fn test_dt_add_day() {
        assert_eq!(Dt::of(2020, 07, 04) + interval::D(0), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::D(1), Dt::of(2020, 07, 05));
        assert_eq!(Dt::of(2020, 07, 04) + interval::D(10), Dt::of(2020, 07, 14));
        assert_eq!(Dt::of(2020, 07, 04) + interval::D(20), Dt::of(2020, 07, 24));
        assert_eq!(Dt::of(2020, 07, 04) + interval::D(21), Dt::of(2020, 07, 25));
        assert_eq!(Dt::of(2020, 07, 04) + interval::D(22), Dt::of(2020, 07, 26));
        assert_eq!(Dt::of(2020, 07, 04) + interval::D(23), Dt::of(2020, 07, 27));
        assert_eq!(Dt::of(2020, 07, 04) + interval::D(24), Dt::of(2020, 07, 28));
        assert_eq!(Dt::of(2020, 07, 04) + interval::D(25), Dt::of(2020, 07, 29));
        assert_eq!(Dt::of(2020, 07, 04) + interval::D(26), Dt::of(2020, 07, 30));
        assert_eq!(Dt::of(2020, 07, 04) + interval::D(27), Dt::of(2020, 07, 31));
        assert_eq!(Dt::of(2020, 07, 04) + interval::D(28), Dt::of(2020, 08, 01));
        assert_eq!(Dt::of(2020, 07, 04) + interval::D(29), Dt::of(2020, 08, 02));
        assert_eq!(Dt::of(2020, 07, 04) + interval::D(30), Dt::of(2020, 08, 03));
        assert_eq!(Dt::of(2020, 07, 04) + interval::D(31), Dt::of(2020, 08, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::D(62), Dt::of(2020, 09, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::D(92), Dt::of(2020, 10, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::D(365), Dt::of(2021, 07, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::D(365 * 2), Dt::of(2022, 07, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::D(365 * 3), Dt::of(2023, 07, 04));
        assert_eq!(Dt::of(2020, 07, 04) + interval::D(365 * 4), Dt::of(2024, 07, 03));
    }

    #[test]
    fn test_dt_sub_day() {
        assert_eq!(Dt::of(2020, 07, 04) - interval::D(0), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 07, 05) - interval::D(1), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 07, 14) - interval::D(10), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 07, 24) - interval::D(20), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 07, 25) - interval::D(21), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 07, 26) - interval::D(22), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 07, 27) - interval::D(23), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 07, 28) - interval::D(24), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 07, 29) - interval::D(25), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 07, 30) - interval::D(26), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 07, 31) - interval::D(27), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 08, 01) - interval::D(28), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 08, 02) - interval::D(29), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 08, 03) - interval::D(30), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 08, 04) - interval::D(31), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 09, 04) - interval::D(62), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2020, 10, 04) - interval::D(92), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2021, 07, 04) - interval::D(365), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2022, 07, 04) - interval::D(365 * 2), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2023, 07, 04) - interval::D(365 * 3), Dt::of(2020, 07, 04));
        assert_eq!(Dt::of(2024, 07, 03) - interval::D(365 * 4), Dt::of(2020, 07, 04));
    }

    #[test]
    fn test_dt_sub_y0() {
        assert_eq!(Dt::of(2024, 07, 04) - interval::Y(2024), Dt::of(0, 07, 04));
        assert_eq!(Dt::of(2024, 07, 04) - interval::M(2024 * 12), Dt::of(0, 07, 04));
        assert_eq!(Dt::of(2024, 07, 04) - interval::W((2024 * 52) + 359), Dt::of(0, 7, 6));
        assert_eq!(Dt::of(2024, 07, 04) - interval::D(2024 * 365 + 491), Dt::of(0, 07, 04));
    }

    #[test]
    fn test_dt_end_of_month() {
        assert_eq!(Dt::of(2024, 02, 29) + interval::Y(1), Dt::of(2025, 02, 28));
        assert_eq!(Dt::of(2024, 02, 29) - interval::Y(1), Dt::of(2023, 02, 28));
        assert_eq!(Dt::of(2024, 02, 29) + interval::M(12), Dt::of(2025, 02, 28));
        assert_eq!(Dt::of(2024, 02, 29) - interval::M(12), Dt::of(2023, 02, 28));
        assert_eq!(Dt::of(2025, 10, 31) + interval::M(1), Dt::of(2025, 11, 30));
        assert_eq!(Dt::of(2025, 10, 31) - interval::M(1), Dt::of(2025, 09, 30));
    }

    #[test]
    fn test_dt_sub_overflow() {
        assert_eq!(Dt::of(2024, 07, 04) - interval::Y(2025), Dt::of(0000, 01, 01));
        assert_eq!(Dt::of(2024, 07, 04) - interval::M(2025 * 12), Dt::of(0000, 01, 01));
        assert_eq!(Dt::of(2024, 07, 04) - interval::W((2025 * 52) + 500), Dt::of(0000, 01, 01));
        assert_eq!(Dt::of(2024, 07, 04) - interval::D(2025 * 365 + 491), Dt::of(0000, 01, 01));
    }

    #[test]
    fn test_dt_comp() {
        assert_eq!(Dt::of(2024, 07, 04) > Dt::of(2024, 07, 03), true);
        assert_eq!(Dt::of(2024, 07, 04) > Dt::of(2024, 06, 04), true);
        assert_eq!(Dt::of(2024, 07, 04) > Dt::of(2023, 07, 04), true);
        assert_eq!(Dt::of(2024, 07, 04) < Dt::of(2024, 07, 05), true);
        assert_eq!(Dt::of(2024, 07, 04) < Dt::of(2024, 08, 04), true);
        assert_eq!(Dt::of(2024, 07, 04) < Dt::of(2025, 07, 04), true);
        assert_eq!(Dt::of(2024, 07, 04) == Dt::of(2024, 07, 04), true);
        assert_eq!(Dt::of(2024, 07, 04) >= Dt::of(2024, 07, 04), true);
        assert_eq!(Dt::of(2024, 07, 04) <= Dt::of(2024, 07, 04), true);
    }

    #[test]
    fn test_y_is_leap_divisable_by_four() {
        assert_eq!(y_is_leap(&Y(2004)), true);
        assert_eq!(y_is_leap(&Y(2008)), true);
        assert_eq!(y_is_leap(&Y(2012)), true);
        assert_eq!(y_is_leap(&Y(2016)), true);
        assert_eq!(y_is_leap(&Y(2020)), true);
        assert_eq!(y_is_leap(&Y(2024)), true);
    }

    #[test]
    fn test_y_is_leap_divisable_by_one_hundred() {
        assert_eq!(y_is_leap(&Y(1300)), false);
        assert_eq!(y_is_leap(&Y(1400)), false);
        assert_eq!(y_is_leap(&Y(1500)), false);
        assert_eq!(y_is_leap(&Y(1700)), false);
        assert_eq!(y_is_leap(&Y(1800)), false);
        assert_eq!(y_is_leap(&Y(1900)), false);
    }

    #[test]
    fn test_y_is_leap_divisable_by_four_hundred() {
        assert_eq!(y_is_leap(&Y(400)), true);
        assert_eq!(y_is_leap(&Y(800)), true);
        assert_eq!(y_is_leap(&Y(1200)), true);
        assert_eq!(y_is_leap(&Y(1600)), true);
        assert_eq!(y_is_leap(&Y(2000)), true);
    }

    #[test]
    fn test_y_is_leap_other_years() {
        assert_eq!(y_is_leap(&Y(1900)), false);
        assert_eq!(y_is_leap(&Y(1901)), false);
        assert_eq!(y_is_leap(&Y(1902)), false);
        assert_eq!(y_is_leap(&Y(1903)), false);
        assert_eq!(y_is_leap(&Y(2001)), false);
        assert_eq!(y_is_leap(&Y(2002)), false);
        assert_eq!(y_is_leap(&Y(2003)), false);
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
    fn test_y_days() {
        assert_eq!(y_days(&Y(400)), interval::D(366));
        assert_eq!(y_days(&Y(800)), interval::D(366));
        assert_eq!(y_days(&Y(1200)), interval::D(366));
        assert_eq!(y_days(&Y(1600)), interval::D(366));
        assert_eq!(y_days(&Y(2000)), interval::D(366));
        assert_eq!(y_days(&Y(2004)), interval::D(366));
        assert_eq!(y_days(&Y(2008)), interval::D(366));
        assert_eq!(y_days(&Y(2012)), interval::D(366));
        assert_eq!(y_days(&Y(2016)), interval::D(366));
        assert_eq!(y_days(&Y(2020)), interval::D(366));
        assert_eq!(y_days(&Y(2024)), interval::D(366));
        assert_eq!(y_days(&Y(1300)), interval::D(365));
        assert_eq!(y_days(&Y(1400)), interval::D(365));
        assert_eq!(y_days(&Y(1500)), interval::D(365));
        assert_eq!(y_days(&Y(1700)), interval::D(365));
        assert_eq!(y_days(&Y(1800)), interval::D(365));
        assert_eq!(y_days(&Y(1900)), interval::D(365));
        assert_eq!(y_days(&Y(1900)), interval::D(365));
        assert_eq!(y_days(&Y(1901)), interval::D(365));
        assert_eq!(y_days(&Y(1902)), interval::D(365));
        assert_eq!(y_days(&Y(1903)), interval::D(365));
        assert_eq!(y_days(&Y(2001)), interval::D(365));
        assert_eq!(y_days(&Y(2002)), interval::D(365));
        assert_eq!(y_days(&Y(2001)), interval::D(365));
        assert_eq!(y_days(&Y(2002)), interval::D(365));
        assert_eq!(y_days(&Y(2003)), interval::D(365));
    }

    #[test]
    fn test_m_days_except_feb() {
        assert_eq!(m_days(&Y(2000), &M::Jan), D(31));
        assert_eq!(m_days(&Y(2000), &M::Mar), D(31));
        assert_eq!(m_days(&Y(2000), &M::Apr), D(30));
        assert_eq!(m_days(&Y(2000), &M::May), D(31));
        assert_eq!(m_days(&Y(2000), &M::Jun), D(30));
        assert_eq!(m_days(&Y(2000), &M::Jul), D(31));
        assert_eq!(m_days(&Y(2000), &M::Aug), D(31));
        assert_eq!(m_days(&Y(2000), &M::Sep), D(30));
        assert_eq!(m_days(&Y(2000), &M::Oct), D(31));
        assert_eq!(m_days(&Y(2000), &M::Nov), D(30));
        assert_eq!(m_days(&Y(2000), &M::Dec), D(31));
    }

    #[test]
    fn test_m_days_feb() {
        assert_eq!(m_days(&Y(2000), &M::Feb), D(29));
        assert_eq!(m_days(&Y(2004), &M::Feb), D(29));
        assert_eq!(m_days(&Y(2008), &M::Feb), D(29));
        assert_eq!(m_days(&Y(1900), &M::Feb), D(28));
        assert_eq!(m_days(&Y(1901), &M::Feb), D(28));
        assert_eq!(m_days(&Y(2001), &M::Feb), D(28));
        assert_eq!(m_days(&Y(2002), &M::Feb), D(28));
    }

    #[test]
    fn test_m_days_off_end_m() {
        assert_eq!(m_days_off_end(&Dt::of(2025, 01, 01)), interval::D(30));
        assert_eq!(m_days_off_end(&Dt::of(2025, 03, 01)), interval::D(30));
        assert_eq!(m_days_off_end(&Dt::of(2025, 04, 01)), interval::D(29));
        assert_eq!(m_days_off_end(&Dt::of(2025, 05, 01)), interval::D(30));
        assert_eq!(m_days_off_end(&Dt::of(2025, 06, 01)), interval::D(29));
        assert_eq!(m_days_off_end(&Dt::of(2025, 07, 01)), interval::D(30));
        assert_eq!(m_days_off_end(&Dt::of(2025, 08, 01)), interval::D(30));
        assert_eq!(m_days_off_end(&Dt::of(2025, 09, 01)), interval::D(29));
        assert_eq!(m_days_off_end(&Dt::of(2025, 10, 01)), interval::D(30));
        assert_eq!(m_days_off_end(&Dt::of(2025, 12, 01)), interval::D(30));
    }

    #[test]
    fn test_m_days_off_end_feb() {
        assert_eq!(m_days_off_end(&Dt::of(2021, 02, 01)), interval::D(27));
        assert_eq!(m_days_off_end(&Dt::of(2022, 02, 01)), interval::D(27));
        assert_eq!(m_days_off_end(&Dt::of(2023, 02, 01)), interval::D(27));
        assert_eq!(m_days_off_end(&Dt::of(2024, 02, 01)), interval::D(28));
    }

    #[test]
    fn test_m_days_off_end_nov() {
        assert_eq!(m_days_off_end(&Dt::of(2024, 11, 01)), interval::D(29));
        assert_eq!(m_days_off_end(&Dt::of(2024, 11, 03)), interval::D(27));
        assert_eq!(m_days_off_end(&Dt::of(2024, 11, 05)), interval::D(25));
        assert_eq!(m_days_off_end(&Dt::of(2024, 11, 10)), interval::D(20));
        assert_eq!(m_days_off_end(&Dt::of(2024, 11, 15)), interval::D(15));
        assert_eq!(m_days_off_end(&Dt::of(2024, 11, 20)), interval::D(10));
        assert_eq!(m_days_off_end(&Dt::of(2024, 11, 25)), interval::D(5));
        assert_eq!(m_days_off_end(&Dt::of(2024, 11, 27)), interval::D(3));
        assert_eq!(m_days_off_end(&Dt::of(2024, 11, 30)), interval::D(0));
    }

    #[test]
    fn test_y_days_off_end_m() {
        assert_eq!(y_days_off_end(&Dt::of(2024, 01, 01)), interval::D(365));
        assert_eq!(y_days_off_end(&Dt::of(2024, 03, 01)), interval::D(305));
        assert_eq!(y_days_off_end(&Dt::of(2024, 04, 01)), interval::D(274));
        assert_eq!(y_days_off_end(&Dt::of(2024, 05, 01)), interval::D(244));
        assert_eq!(y_days_off_end(&Dt::of(2024, 06, 01)), interval::D(213));
        assert_eq!(y_days_off_end(&Dt::of(2024, 07, 01)), interval::D(183));
        assert_eq!(y_days_off_end(&Dt::of(2024, 08, 01)), interval::D(152));
        assert_eq!(y_days_off_end(&Dt::of(2024, 09, 01)), interval::D(121));
        assert_eq!(y_days_off_end(&Dt::of(2024, 10, 01)), interval::D(91));
        assert_eq!(y_days_off_end(&Dt::of(2024, 11, 01)), interval::D(60));
    }

    #[test]
    fn test_y_days_off_end_feb() {
        assert_eq!(y_days_off_end(&Dt::of(2021, 02, 01)), interval::D(333));
        assert_eq!(y_days_off_end(&Dt::of(2022, 02, 01)), interval::D(333));
        assert_eq!(y_days_off_end(&Dt::of(2023, 02, 01)), interval::D(333));
        assert_eq!(y_days_off_end(&Dt::of(2024, 02, 01)), interval::D(334));
    }

    #[test]
    fn test_y_days_off_end_dec() {
        assert_eq!(y_days_off_end(&Dt::of(2024, 12, 01)), interval::D(30));
        assert_eq!(y_days_off_end(&Dt::of(2024, 12, 06)), interval::D(25));
        assert_eq!(y_days_off_end(&Dt::of(2024, 12, 11)), interval::D(20));
        assert_eq!(y_days_off_end(&Dt::of(2024, 12, 16)), interval::D(15));
        assert_eq!(y_days_off_end(&Dt::of(2024, 12, 21)), interval::D(10));
        assert_eq!(y_days_off_end(&Dt::of(2024, 12, 26)), interval::D(5));
        assert_eq!(y_days_off_end(&Dt::of(2024, 12, 31)), interval::D(0));
    }

    #[test]
    fn test_y_days_off_begin_m() {
        assert_eq!(y_days_off_begin(&Dt::of(2024, 01, 01)), interval::D(0));
        assert_eq!(y_days_off_begin(&Dt::of(2024, 02, 01)), interval::D(31));
        assert_eq!(y_days_off_begin(&Dt::of(2024, 04, 01)), interval::D(91));
        assert_eq!(y_days_off_begin(&Dt::of(2024, 05, 01)), interval::D(121));
        assert_eq!(y_days_off_begin(&Dt::of(2024, 06, 01)), interval::D(152));
        assert_eq!(y_days_off_begin(&Dt::of(2024, 07, 01)), interval::D(182));
        assert_eq!(y_days_off_begin(&Dt::of(2024, 08, 01)), interval::D(213));
        assert_eq!(y_days_off_begin(&Dt::of(2024, 09, 01)), interval::D(244));
        assert_eq!(y_days_off_begin(&Dt::of(2024, 10, 01)), interval::D(274));
        assert_eq!(y_days_off_begin(&Dt::of(2024, 11, 01)), interval::D(305));
    }

    #[test]
    fn test_y_days_off_begin_feb() {
        assert_eq!(y_days_off_begin(&Dt::of(2021, 03, 01)), interval::D(59));
        assert_eq!(y_days_off_begin(&Dt::of(2022, 03, 01)), interval::D(59));
        assert_eq!(y_days_off_begin(&Dt::of(2023, 03, 01)), interval::D(59));
        assert_eq!(y_days_off_begin(&Dt::of(2024, 03, 01)), interval::D(60));
    }

    #[test]
    fn test_y_days_off_begin_dec() {
        assert_eq!(y_days_off_begin(&Dt::of(2024, 12, 01)), interval::D(335));
        assert_eq!(y_days_off_begin(&Dt::of(2024, 12, 06)), interval::D(340));
        assert_eq!(y_days_off_begin(&Dt::of(2024, 12, 11)), interval::D(345));
        assert_eq!(y_days_off_begin(&Dt::of(2024, 12, 16)), interval::D(350));
        assert_eq!(y_days_off_begin(&Dt::of(2024, 12, 21)), interval::D(355));
        assert_eq!(y_days_off_begin(&Dt::of(2024, 12, 26)), interval::D(360));
        assert_eq!(y_days_off_begin(&Dt::of(2024, 12, 31)), interval::D(365));
    }

    #[test]
    fn test_y_intv_edge_day() {
        assert_eq!(y_intv(&Dt::of(2025, 11, 25), &Dt::of(2026, 11, 23)), interval::Y(0));
        assert_eq!(y_intv(&Dt::of(2025, 11, 25), &Dt::of(2026, 11, 24)), interval::Y(0));
        assert_eq!(y_intv(&Dt::of(2025, 11, 25), &Dt::of(2026, 11, 26)), interval::Y(1));
        assert_eq!(y_intv(&Dt::of(2025, 11, 25), &Dt::of(2026, 11, 27)), interval::Y(1));
    }

    #[test]
    fn test_y_intv_edge_month() {
        assert_eq!(y_intv(&Dt::of(2025, 11, 25), &Dt::of(2026, 10, 30)), interval::Y(0));
        assert_eq!(y_intv(&Dt::of(2025, 11, 25), &Dt::of(2026, 12, 01)), interval::Y(1));
    }

    #[test]
    fn test_y_intv_exact_day() {
        assert_eq!(y_intv(&Dt::of(2025, 11, 25), &Dt::of(2025, 11, 25)), interval::Y(0));
        assert_eq!(y_intv(&Dt::of(2025, 11, 25), &Dt::of(2026, 11, 25)), interval::Y(1));
        assert_eq!(y_intv(&Dt::of(2025, 11, 25), &Dt::of(2027, 11, 25)), interval::Y(2));
        assert_eq!(y_intv(&Dt::of(2025, 11, 25), &Dt::of(2028, 11, 25)), interval::Y(3));
        assert_eq!(y_intv(&Dt::of(2025, 11, 25), &Dt::of(2029, 11, 25)), interval::Y(4));
        assert_eq!(y_intv(&Dt::of(2025, 11, 25), &Dt::of(2030, 11, 25)), interval::Y(5));
    }

    #[test]
    fn test_m_intv_edge_day() {
        assert_eq!(m_intv(&Dt::of(2025, 11, 25), &Dt::of(2026, 11, 23)), interval::M(11));
        assert_eq!(m_intv(&Dt::of(2025, 11, 25), &Dt::of(2026, 11, 24)), interval::M(11));
        assert_eq!(m_intv(&Dt::of(2025, 11, 25), &Dt::of(2026, 11, 26)), interval::M(12));
        assert_eq!(m_intv(&Dt::of(2025, 11, 25), &Dt::of(2026, 11, 27)), interval::M(12));
    }

    #[test]
    fn test_m_intv_exact_day() {
        assert_eq!(m_intv(&Dt::of(2025, 11, 25), &Dt::of(2025, 11, 25)), interval::M(0));
        assert_eq!(m_intv(&Dt::of(2025, 11, 25), &Dt::of(2025, 12, 25)), interval::M(1));
        assert_eq!(m_intv(&Dt::of(2025, 11, 25), &Dt::of(2026, 01, 25)), interval::M(2));
        assert_eq!(m_intv(&Dt::of(2025, 11, 25), &Dt::of(2026, 02, 25)), interval::M(3));
        assert_eq!(m_intv(&Dt::of(2025, 11, 25), &Dt::of(2026, 03, 25)), interval::M(4));
        assert_eq!(m_intv(&Dt::of(2025, 11, 25), &Dt::of(2026, 04, 25)), interval::M(5));
    }

    #[test]
    fn test_w_intv() {
        assert_eq!(w_intv(&Dt::of(2024, 11, 25), &Dt::of(2024, 11, 26)), interval::W(0));
        assert_eq!(w_intv(&Dt::of(2024, 11, 19), &Dt::of(2024, 11, 26)), interval::W(1));
        assert_eq!(w_intv(&Dt::of(2024, 10, 26), &Dt::of(2024, 11, 26)), interval::W(4));
        assert_eq!(w_intv(&Dt::of(2023, 11, 26), &Dt::of(2024, 11, 26)), interval::W(52));
        assert_eq!(w_intv(&Dt::of(2024, 11, 26), &Dt::of(2024, 11, 26)), interval::W(0));
        assert_eq!(w_intv(&Dt::of(2024, 11, 20), &Dt::of(2024, 11, 26)), interval::W(0));
        assert_eq!(w_intv(&Dt::of(2024, 10, 29), &Dt::of(2024, 11, 26)), interval::W(4));
        assert_eq!(w_intv(&Dt::of(2024, 10, 27), &Dt::of(2024, 11, 26)), interval::W(4));
        assert_eq!(w_intv(&Dt::of(2023, 11, 27), &Dt::of(2024, 11, 26)), interval::W(52));
        assert_eq!(w_intv(&Dt::of(1984, 01, 01), &Dt::of(2039, 12, 31)), interval::W(2921));
    }

    #[test]
    fn test_d_intv() {
        assert_eq!(d_intv(&Dt::of(2024, 11, 25), &Dt::of(2024, 11, 25)), interval::D(0));
        assert_eq!(d_intv(&Dt::of(2024, 11, 25), &Dt::of(2024, 11, 26)), interval::D(1));
        assert_eq!(d_intv(&Dt::of(2024, 11, 25), &Dt::of(2024, 11, 27)), interval::D(2));
        assert_eq!(d_intv(&Dt::of(2024, 11, 25), &Dt::of(2024, 11, 28)), interval::D(3));
        assert_eq!(d_intv(&Dt::of(2024, 11, 25), &Dt::of(2024, 11, 29)), interval::D(4));
        assert_eq!(d_intv(&Dt::of(2024, 11, 25), &Dt::of(2024, 11, 30)), interval::D(5));
        assert_eq!(d_intv(&Dt::of(2024, 11, 25), &Dt::of(2024, 12, 01)), interval::D(6));
        assert_eq!(d_intv(&Dt::of(2024, 11, 25), &Dt::of(2024, 12, 02)), interval::D(7));
        assert_eq!(d_intv(&Dt::of(1984, 01, 01), &Dt::of(2039, 12, 31)), interval::D(20453));
    }

    #[test]
    fn test_d_intv_between_month() {
        assert_eq!(d_intv(&Dt::of(2026, 01, 31), &Dt::of(2026, 02, 01)), interval::D(1));
        assert_eq!(d_intv(&Dt::of(2026, 02, 28), &Dt::of(2026, 03, 01)), interval::D(1));
        assert_eq!(d_intv(&Dt::of(2026, 03, 31), &Dt::of(2026, 04, 01)), interval::D(1));
        assert_eq!(d_intv(&Dt::of(2026, 04, 30), &Dt::of(2026, 05, 01)), interval::D(1));
        assert_eq!(d_intv(&Dt::of(2026, 05, 31), &Dt::of(2026, 06, 01)), interval::D(1));
        assert_eq!(d_intv(&Dt::of(2026, 06, 30), &Dt::of(2026, 07, 01)), interval::D(1));
        assert_eq!(d_intv(&Dt::of(2026, 07, 31), &Dt::of(2026, 08, 01)), interval::D(1));
        assert_eq!(d_intv(&Dt::of(2026, 08, 31), &Dt::of(2026, 09, 01)), interval::D(1));
        assert_eq!(d_intv(&Dt::of(2026, 09, 30), &Dt::of(2026, 10, 01)), interval::D(1));
        assert_eq!(d_intv(&Dt::of(2026, 10, 31), &Dt::of(2026, 11, 01)), interval::D(1));
        assert_eq!(d_intv(&Dt::of(2026, 11, 30), &Dt::of(2026, 12, 01)), interval::D(1));
    }

    #[test]
    fn test_d_intv_between_year() {
        assert_eq!(d_intv(&Dt::of(2020, 12, 31), &Dt::of(2021, 01, 01)), interval::D(1));
        assert_eq!(d_intv(&Dt::of(2020, 12, 30), &Dt::of(2021, 01, 02)), interval::D(3));
        assert_eq!(d_intv(&Dt::of(2021, 12, 31), &Dt::of(2022, 01, 01)), interval::D(1));
        assert_eq!(d_intv(&Dt::of(2022, 12, 31), &Dt::of(2023, 01, 01)), interval::D(1));
    }

    #[test]
    fn test_d_intv_full_year() {
        assert_eq!(d_intv(&Dt::of(2020, 01, 01), &Dt::of(2020, 12, 31)), interval::D(365));
        assert_eq!(d_intv(&Dt::of(2021, 01, 01), &Dt::of(2021, 12, 31)), interval::D(364));
        assert_eq!(d_intv(&Dt::of(2022, 01, 01), &Dt::of(2022, 12, 31)), interval::D(364));
        assert_eq!(d_intv(&Dt::of(2023, 01, 01), &Dt::of(2023, 12, 31)), interval::D(364));
        assert_eq!(d_intv(&Dt::of(2024, 01, 01), &Dt::of(2024, 12, 31)), interval::D(365));
        assert_eq!(d_intv(&Dt::of(2025, 01, 01), &Dt::of(2025, 12, 31)), interval::D(364));
        assert_eq!(d_intv(&Dt::of(2026, 01, 01), &Dt::of(2026, 12, 31)), interval::D(364));
        assert_eq!(d_intv(&Dt::of(2027, 01, 01), &Dt::of(2027, 12, 31)), interval::D(364));
        assert_eq!(d_intv(&Dt::of(2028, 01, 01), &Dt::of(2028, 12, 31)), interval::D(365));
    }

    #[test]
    fn test_d_intv_1_year() {
        assert_eq!(d_intv(&Dt::of(2020, 01, 01), &Dt::of(2021, 01, 01)), interval::D(366));
        assert_eq!(d_intv(&Dt::of(2021, 01, 01), &Dt::of(2022, 01, 01)), interval::D(365));
        assert_eq!(d_intv(&Dt::of(2022, 01, 01), &Dt::of(2023, 01, 01)), interval::D(365));
        assert_eq!(d_intv(&Dt::of(2023, 01, 01), &Dt::of(2024, 01, 01)), interval::D(365));
        assert_eq!(d_intv(&Dt::of(2024, 01, 01), &Dt::of(2025, 01, 01)), interval::D(366));
        assert_eq!(d_intv(&Dt::of(2025, 01, 01), &Dt::of(2026, 01, 01)), interval::D(365));
        assert_eq!(d_intv(&Dt::of(2026, 01, 01), &Dt::of(2027, 01, 01)), interval::D(365));
        assert_eq!(d_intv(&Dt::of(2027, 01, 01), &Dt::of(2028, 01, 01)), interval::D(365));
        assert_eq!(d_intv(&Dt::of(2028, 01, 01), &Dt::of(2029, 01, 01)), interval::D(366));
    }

    #[test]
    fn test_d_intv_2_year() {
        assert_eq!(d_intv(&Dt::of(2020, 01, 01), &Dt::of(2022, 01, 01)), interval::D(366 + 365));
        assert_eq!(d_intv(&Dt::of(2021, 01, 01), &Dt::of(2023, 01, 01)), interval::D(365 + 365));
        assert_eq!(d_intv(&Dt::of(2022, 01, 01), &Dt::of(2024, 01, 01)), interval::D(365 + 365));
        assert_eq!(d_intv(&Dt::of(2023, 01, 01), &Dt::of(2025, 01, 01)), interval::D(365 + 366));
        assert_eq!(d_intv(&Dt::of(2024, 01, 01), &Dt::of(2026, 01, 01)), interval::D(366 + 365));
        assert_eq!(d_intv(&Dt::of(2025, 01, 01), &Dt::of(2027, 01, 01)), interval::D(365 + 365));
        assert_eq!(d_intv(&Dt::of(2026, 01, 01), &Dt::of(2028, 01, 01)), interval::D(365 + 365));
        assert_eq!(d_intv(&Dt::of(2027, 01, 01), &Dt::of(2029, 01, 01)), interval::D(365 + 366));
    }

    #[test]
    fn test_d_intv_3_year() {
        assert_eq!(d_intv(&Dt::of(2020, 01, 01), &Dt::of(2023, 01, 01)), interval::D(366 + 365 + 365));
        assert_eq!(d_intv(&Dt::of(2021, 01, 01), &Dt::of(2024, 01, 01)), interval::D(365 + 365 + 365));
        assert_eq!(d_intv(&Dt::of(2022, 01, 01), &Dt::of(2025, 01, 01)), interval::D(365 + 365 + 366));
        assert_eq!(d_intv(&Dt::of(2023, 01, 01), &Dt::of(2026, 01, 01)), interval::D(365 + 366 + 365));
        assert_eq!(d_intv(&Dt::of(2024, 01, 01), &Dt::of(2027, 01, 01)), interval::D(366 + 365 + 365));
        assert_eq!(d_intv(&Dt::of(2025, 01, 01), &Dt::of(2028, 01, 01)), interval::D(365 + 365 + 365));
        assert_eq!(d_intv(&Dt::of(2026, 01, 01), &Dt::of(2029, 01, 01)), interval::D(365 + 365 + 366));
    }

    #[test]
    fn test_d_intv_4_year() {
        assert_eq!(d_intv(&Dt::of(2020, 01, 01), &Dt::of(2024, 01, 01)), interval::D(366 + 365 + 365 + 365));
        assert_eq!(d_intv(&Dt::of(2021, 01, 01), &Dt::of(2025, 01, 01)), interval::D(365 + 365 + 365 + 366));
        assert_eq!(d_intv(&Dt::of(2022, 01, 01), &Dt::of(2026, 01, 01)), interval::D(365 + 365 + 366 + 365));
        assert_eq!(d_intv(&Dt::of(2023, 01, 01), &Dt::of(2027, 01, 01)), interval::D(365 + 366 + 365 + 365));
        assert_eq!(d_intv(&Dt::of(2024, 01, 01), &Dt::of(2028, 01, 01)), interval::D(366 + 365 + 365 + 365));
        assert_eq!(d_intv(&Dt::of(2025, 01, 01), &Dt::of(2029, 01, 01)), interval::D(365 + 365 + 365 + 366));
    }

    #[test]
    fn test_d_intv_5_year() {
        assert_eq!(d_intv(&Dt::of(2020, 01, 01), &Dt::of(2025, 01, 01)), interval::D(366 + 365 + 365 + 365 + 366));
        assert_eq!(d_intv(&Dt::of(2021, 01, 01), &Dt::of(2026, 01, 01)), interval::D(365 + 365 + 365 + 366 + 365));
        assert_eq!(d_intv(&Dt::of(2022, 01, 01), &Dt::of(2027, 01, 01)), interval::D(365 + 365 + 366 + 365 + 365));
        assert_eq!(d_intv(&Dt::of(2023, 01, 01), &Dt::of(2028, 01, 01)), interval::D(365 + 366 + 365 + 365 + 365));
        assert_eq!(d_intv(&Dt::of(2024, 01, 01), &Dt::of(2029, 01, 01)), interval::D(366 + 365 + 365 + 365 + 366));
    }

    #[test]
    fn test_d_intv_6_year() {
        assert_eq!(d_intv(&Dt::of(2020, 01, 01), &Dt::of(2026, 01, 01)), interval::D(366 + 365 + 365 + 365 + 366 + 365));
        assert_eq!(d_intv(&Dt::of(2021, 01, 01), &Dt::of(2027, 01, 01)), interval::D(365 + 365 + 365 + 366 + 365 + 365));
        assert_eq!(d_intv(&Dt::of(2022, 01, 01), &Dt::of(2028, 01, 01)), interval::D(365 + 365 + 366 + 365 + 365 + 365));
        assert_eq!(d_intv(&Dt::of(2023, 01, 01), &Dt::of(2029, 01, 01)), interval::D(365 + 366 + 365 + 365 + 365 + 366));
    }

    #[test]
    fn test_d_intv_multiple_year() {
        assert_eq!(d_intv(&Dt::of(2023, 01, 01), &Dt::of(2029, 01, 01)), interval::D(365 + 366 + 365 + 365 + 365 + 366));
        assert_eq!(d_intv(&Dt::of(2023, 01, 10), &Dt::of(2029, 01, 10)), interval::D(365 + 366 + 365 + 365 + 365 + 366));
        assert_eq!(d_intv(&Dt::of(2023, 01, 10), &Dt::of(2029, 01, 05)), interval::D(365 + 366 + 365 + 365 + 365 + 366 - 5));
    }

    #[test]
    fn test_interval_between_1() {
        assert_eq!(intv_between(&Dt::of(2024, 11, 25), &Dt::of(2024, 11, 26)), interval::Dt::of(0, 0, 0, 1));
        assert_eq!(intv_between(&Dt::of(2024, 11, 19), &Dt::of(2024, 11, 26)), interval::Dt::of(0, 0, 1, 7));
        assert_eq!(intv_between(&Dt::of(2024, 10, 26), &Dt::of(2024, 11, 26)), interval::Dt::of(0, 1, 4, 31));
        assert_eq!(intv_between(&Dt::of(2023, 11, 26), &Dt::of(2024, 11, 26)), interval::Dt::of(1, 12, 52, 366));
    }

    #[test]
    fn test_interval_between_0() {
        assert_eq!(intv_between(&Dt::of(2024, 11, 26), &Dt::of(2024, 11, 26)), interval::Dt::of(0, 0, 0, 0));
        assert_eq!(intv_between(&Dt::of(2024, 11, 20), &Dt::of(2024, 11, 26)), interval::Dt::of(0, 0, 0, 6));
        assert_eq!(intv_between(&Dt::of(2024, 10, 29), &Dt::of(2024, 11, 26)), interval::Dt::of(0, 0, 4, 28));
        assert_eq!(intv_between(&Dt::of(2024, 10, 27), &Dt::of(2024, 11, 26)), interval::Dt::of(0, 0, 4, 30));
        assert_eq!(intv_between(&Dt::of(2023, 11, 27), &Dt::of(2024, 11, 26)), interval::Dt::of(0, 11, 52, 365));
    }

    #[test]
    fn test_interval_between_big_distance() {
        assert_eq!(intv_between(&Dt::of(1984, 01, 01), &Dt::of(2039, 12, 31)), interval::Dt::of(55, 671, 2921, 20453));
    }
}
