pub mod date;

use chrono::{Datelike, Days, Months, NaiveDate, TimeDelta};

#[derive(Debug, PartialEq)]
pub enum Period {
    D1,
    D2,
    W1,
    //W2,
    M1,
    M3,
    M6,
    Y1,
    Y2,
}

/*
impl ops::Add<DateInterval> for Date {
    type Output = Date;

    fn add(self, intv: DateInterval) -> Date {
        let a_naive_date = NaiveDate::from_ymd_opt(i32::from(self.y), u32::from(self.m), u32::from(self.d)).unwrap();
        a_naive_date.checked_add_days(days)


        let = TimeDelta::try_weeks(intv.w) + TimeDelta::try_days(intv.d);

        let delta_d = intv.w * 7 + intv.d;

        Date { y, m, d }
    }
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

fn interval_between(a: Date, b: Date) -> DateInterval {
    let mut y = b.y - a.y;
    if y > 0 && ((b.m < a.m) || (b.m == a.m && b.d < a.d)) {
        y -= 1;
    }
    let mut m = ((b.y as i16 * 12 + b.m as i16) - (a.y as i16 * 12 + a.m as i16)) as u16;
    if m > 0 && b.d < a.d {
        m -= 1;
    }
    let a_naive_date = NaiveDate::from_ymd_opt(i32::from(a.y), u32::from(a.m), u32::from(a.d)).unwrap();
    let b_naive_date = NaiveDate::from_ymd_opt(i32::from(b.y), u32::from(b.m), u32::from(b.d)).unwrap();
    let diff = b_naive_date - a_naive_date;
    let d = diff.num_days();
    let w = diff.num_days() / 7;

    DateInterval { d: d as u32, w: w as u32, m, y }
}

pub fn closest_rep(evt: Event, dt: Date) -> Option<Date> {
    let base_date = NaiveDate::from_ymd_opt(i32::from(evt.dt.y), u32::from(evt.dt.m), u32::from(evt.dt.d)).unwrap();
    if  dt.y < evt.dt.y {
        return None
    }
    if dt.y == evt.dt.y && dt.m < evt.dt.m {
        return None
    }
    if dt.y == evt.dt.y &&  dt.m == evt.dt.m && dt.d < evt.dt.d {
        return None
    }
    let diff = interval_between(evt.dt, dt);
    let res = match evt.freq {
        Some(Period::D1) => Some(base_date + Days::new(u64::from(diff.d))),
        Some(Period::D2) => Some(base_date + Days::new(u64::from(diff.d - (diff.d % 2)))),
        Some(Period::W1) => Some(base_date + Days::new(u64::from(diff.w * 7))),
        Some(Period::M1) => Some(base_date + Months::new(diff.m as u32)),
        Some(Period::M3) => Some(base_date + Months::new((diff.m - (diff.m % 3)) as u32)),
        Some(Period::M6) => Some(base_date + Months::new((diff.m - (diff.m % 6)) as u32)),
        Some(Period::Y1) => Some(base_date + Months::new((diff.y * 12) as u32)),
        Some(Period::Y2) => Some(base_date + Months::new((diff.y * 12 - ((diff.y* 12) % 2)) as u32)),
        None => None
    };

    match res {
        Some(res) => Some(Date { y: res.year() as u16, m: res.month0() as u8 +1, d: res.day0() as u8+1}),
        None => None,
    }
}
pub fn rep(evt: Event, i: u32) -> Option<Date> {
    match evt.freq {
        Some(Period::D1) => evt.add({ days: 1 * i }),
        Some(Period::D2) => evt.add({ days: 2 * i }),
        Some(Period::W1) => evt.add({ days: 7 * i }),
        Some(Period::M1) => evt.add({ months: 1 * i }),
        Some(Period::M3) => evt.add({ months: 3 * i }),
        Some(Period::M6) => evt.add({ months: 6 * i }),
        Some(Period::Y1) => evt.add({ years: 1 * i }),
        Some(Period::Y2) => evt.add({ years: 2 * i }),
        None => None
    }
}

pub fn rep_lazy(evt: Event) -> impl Iterator<Item = Option<Date>> {
    let mut i = 0;

    next(): IteratorResult<string | undefined> {
        i+= 1;
        const value = rep(evt, i);
        return {
            done: false,
            value,
        };
    },
}

pub fn rep_in_period(evt: Event, begin: Date, end: Date) -> Vec<Date> {
    let res: string[] = [];
    if evt.d > end {
        return res;
    }
    let base: string | undefined;
    if evt.d > begin {
        base = evt.d;
        res.push(base);
    } else {
        base = closestRep(evt, begin);
    }
    if (!base) {
        return res;
    }
    let it = repLazy(Event { dt: base, freq: evt.freq });
    let current = it.next().value;
    while (current !== undefined && current <= end) {
        res.push(current);
        current = it.next().value;
    }
    return res;
}*/

fn main() {}

/*
#[cfg(test)]
mod test {
    use super::*;
    #[test]
    fn test_event() {
        assert_eq!(
            Event::from(Date::from(2024, 11, 22), Period::M6),
            Event { dt: Date { y: 2024, m: 11, d: 22 }, freq: Some(Period::M6) }
        );
    }

    #[test]
    fn test_interval_between_1() {
        assert_eq!(
            interval_between(Date::from(2024, 11, 25), Date::from(2024, 11, 26)),
            DateInterval { d: 1, w: 0, m: 0, y: 0 }
        );
        assert_eq!(
            interval_between(Date::from(2024, 11, 19), Date::from(2024, 11, 26)),
            DateInterval { d: 7, w: 1, m: 0, y: 0 }
        );
        assert_eq!(
            interval_between(Date::from(2024, 10, 26), Date::from(2024, 11, 26)),
            DateInterval { d: 31, w: 4, m: 1, y: 0 }
        );
        assert_eq!(
            interval_between(Date::from(2023, 11, 26), Date::from(2024, 11, 26)),
            DateInterval { d: 366, w: 52, m: 12, y: 1 }
        );
    }

    #[test]
    fn test_interval_between_0() {
        assert_eq!(
            interval_between(Date::from(2024, 11, 26), Date::from(2024, 11, 26)),
            DateInterval { d: 0, w: 0, m: 0, y: 0 }
        );
        assert_eq!(
            interval_between(Date::from(2024, 11, 20), Date::from(2024, 11, 26)),
            DateInterval { d: 6, w: 0, m: 0, y: 0 }
        );
        assert_eq!(
            interval_between(Date::from(2024, 10, 29), Date::from(2024, 11, 26)),
            DateInterval { d: 28, w: 4, m: 0, y: 0 }
        );
        assert_eq!(
            interval_between(Date::from(2024, 10, 27), Date::from(2024, 11, 26)),
            DateInterval { d: 30, w: 4, m: 0, y: 0 }
        );
        assert_eq!(
            interval_between(Date::from(2023, 11, 27), Date::from(2024, 11, 26)),
            DateInterval { d: 365, w: 52, m: 11, y: 0 }
        );
    }

    #[test]
    fn test_interval_between_big_distance() {
        assert_eq!(
            interval_between(Date::from(1984, 01, 01), Date::from(2039, 12, 31)),
            DateInterval { d: 20453, w: 2921, m: 671, y: 55 }
        );
    }

      #[test]
    fn test_closest_rep_none() {
        assert_eq!(closest_rep(Event { dt: Date::from(2000, 01, 01), freq: None }, Date::from(2023, 08, 01)), None);
    }

    #[test]
    fn test_clorest_rep_before() {
        assert_eq!(closest_rep(Event::from(Date::from(2019, 08, 08), Period::D1), Date::from(2019, 08, 07)), None);
        assert_eq!(closest_rep(Event::from(Date::from(2019, 08, 08), Period::D2), Date::from(2019, 08, 07)), None);
        assert_eq!(closest_rep(Event::from(Date::from(2019, 08, 08), Period::W1), Date::from(2019, 08, 07)), None);
        assert_eq!(closest_rep(Event::from(Date::from(2019, 08, 08), Period::M1), Date::from(2019, 08, 07)), None);
        assert_eq!(closest_rep(Event::from(Date::from(2019, 08, 08), Period::M3), Date::from(2019, 08, 07)), None);
        assert_eq!(closest_rep(Event::from(Date::from(2019, 08, 08), Period::M6), Date::from(2019, 08, 07)), None);
        assert_eq!(closest_rep(Event::from(Date::from(2019, 08, 08), Period::Y1), Date::from(2019, 08, 07)), None);
        assert_eq!(closest_rep(Event::from(Date::from(2019, 08, 08), Period::Y2), Date::from(2019, 08, 07)), None);
    }

    #[test]
    fn test_clorest_rep_same_day() {
        assert_eq!(closest_rep(Event::from(Date::from(2020, 08, 08), Period::D1), Date::from(2020, 08, 08)), None);
        assert_eq!(closest_rep(Event::from(Date::from(2020, 08, 08), Period::D2), Date::from(2020, 08, 08)), None);
        assert_eq!(closest_rep(Event::from(Date::from(2020, 08, 08), Period::W1), Date::from(2020, 08, 08)), None);
        assert_eq!(closest_rep(Event::from(Date::from(2020, 08, 08), Period::M1), Date::from(2020, 08, 08)), None);
        assert_eq!(closest_rep(Event::from(Date::from(2020, 08, 08), Period::M3), Date::from(2020, 08, 08)), None);
        assert_eq!(closest_rep(Event::from(Date::from(2020, 08, 08), Period::M6), Date::from(2020, 08, 08)), None);
        assert_eq!(closest_rep(Event::from(Date::from(2020, 08, 08), Period::Y1), Date::from(2020, 08, 08)), None);
        assert_eq!(closest_rep(Event::from(Date::from(2020, 08, 08), Period::Y2), Date::from(2020, 08, 08)), None);
    }

    #[test]
    fn test_clorest_rep_exact_day() {
        assert_eq!(closest_rep(Event::from(Date::from(2021, 08, 08), Period::D1), Date::from(2021, 08, 09)), Some(Date::from(2021, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date::from(2021, 08, 08), Period::D2), Date::from(2021, 08, 10)), Some(Date::from(2021, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date::from(2021, 08, 08), Period::W1), Date::from(2021, 08, 15)), Some(Date::from(2021, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date::from(2021, 08, 08), Period::M1), Date::from(2021, 09, 08)), Some(Date::from(2021, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date::from(2021, 08, 08), Period::M3), Date::from(2021, 11, 08)), Some(Date::from(2021, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date::from(2021, 08, 08), Period::M6), Date::from(2022, 02, 08)), Some(Date::from(2021, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date::from(2021, 08, 08), Period::Y1), Date::from(2022, 08, 08)), Some(Date::from(2021, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date::from(2021, 08, 08), Period::Y2), Date::from(2023, 08, 08)), Some(Date::from(2021, 08, 08)));
    }

    #[test]
    fn test_clorest_rep_next_day() {
        assert_eq!(closest_rep(Event::from(Date::from(2021, 08, 08), Period::D2), Date::from(2021, 08, 11)), Some(Date::from(2021, 08, 10)));
        assert_eq!(closest_rep(Event::from(Date::from(2021, 08, 08), Period::W1), Date::from(2021, 08, 16)), Some(Date::from(2021, 08, 15)));
        assert_eq!(closest_rep(Event::from(Date::from(2021, 08, 08), Period::M1), Date::from(2021, 09, 09)), Some(Date::from(2021, 09, 08)));
        assert_eq!(closest_rep(Event::from(Date::from(2021, 08, 08), Period::M3), Date::from(2021, 11, 09)), Some(Date::from(2021, 11, 08)));
        assert_eq!(closest_rep(Event::from(Date::from(2021, 08, 08), Period::M6), Date::from(2022, 02, 09)), Some(Date::from(2022, 02, 08)));
        assert_eq!(closest_rep(Event::from(Date::from(2021, 08, 08), Period::Y1), Date::from(2022, 08, 09)), Some(Date::from(2022, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date::from(2021, 08, 08), Period::Y2), Date::from(2023, 08, 09)), Some(Date::from(2023, 08, 08)));
    }

    #[test]
    fn test_closest_rep_1d() {
        assert_eq!(closest_rep(Event::from(Date::from(2000, 01, 01), Period::D1), Date::from(2023, 08, 01)), Some(Date::from(2023, 08, 01)));
        assert_eq!(closest_rep(Event::from(Date::from(2000, 01, 01), Period::D1), Date::from(2023, 08, 02)), Some(Date::from(2023, 08, 02)));
        assert_eq!(closest_rep(Event::from(Date::from(2000, 01, 01), Period::D1), Date::from(2023, 08, 03)), Some(Date::from(2023, 08, 03)));
        assert_eq!(closest_rep(Event::from(Date::from(2000, 01, 01), Period::D1), Date::from(2023, 08, 04)), Some(Date::from(2023, 08, 04)));
    }

    #[test]
    fn test_closest_rep_2d() {
        assert_eq!(closest_rep(Event::from(Date::from(2023, 06, 01), Period::D2), Date::from(2023, 06, 02)), Some(Date::from(2023, 06, 01)));
        assert_eq!(closest_rep(Event::from(Date::from(2023, 06, 01), Period::D2), Date::from(2023, 06, 03)), Some(Date::from(2023, 06, 03)));
        assert_eq!(closest_rep(Event::from(Date::from(2023, 06, 01), Period::D2), Date::from(2023, 06, 04)), Some(Date::from(2023, 06, 03)));
        assert_eq!(closest_rep(Event::from(Date::from(2023, 06, 01), Period::D2), Date::from(2023, 06, 05)), Some(Date::from(2023, 06, 05)));
    }

    #[test]
    fn test_closest_rep_1w() {
        assert_eq!(closest_rep(Event::from(Date::from(2023, 07, 03), Period::W1), Date::from(2023, 07, 09)), Some(Date::from(2023, 07, 03)));
        assert_eq!(closest_rep(Event::from(Date::from(2023, 07, 03), Period::W1), Date::from(2023, 07, 10)), Some(Date::from(2023, 07, 10)));
        assert_eq!(closest_rep(Event::from(Date::from(2023, 07, 03), Period::W1), Date::from(2023, 07, 11)), Some(Date::from(2023, 07, 10)));
        assert_eq!(closest_rep(Event::from(Date::from(2023, 07, 03), Period::W1), Date::from(2023, 07, 12)), Some(Date::from(2023, 07, 10)));
    }

    #[test]
    fn test_closest_rep_1m() {
        assert_eq!(closest_rep(Event::from(Date::from(2019, 01, 03), Period::M1), Date::from(2023, 03, 02)), Some(Date::from(2023, 02, 03)));
        assert_eq!(closest_rep(Event::from(Date::from(2019, 01, 03), Period::M1), Date::from(2023, 03, 03)), Some(Date::from(2023, 03, 03)));
        assert_eq!(closest_rep(Event::from(Date::from(2019, 01, 03), Period::M1), Date::from(2023, 03, 04)), Some(Date::from(2023, 03, 03)));
        assert_eq!(closest_rep(Event::from(Date::from(2019, 01, 03), Period::M1), Date::from(2023, 03, 05)), Some(Date::from(2023, 03, 03)));
    }

    #[test]
    fn test_closest_rep_3m() {
        assert_eq!(closest_rep(Event::from(Date::from(2019, 01, 03), Period::M3), Date::from(2023, 01, 02)), Some(Date::from(2022, 10, 03)));
        assert_eq!(closest_rep(Event::from(Date::from(2019, 01, 03), Period::M3), Date::from(2023, 01, 03)), Some(Date::from(2023, 01, 03)));
        assert_eq!(closest_rep(Event::from(Date::from(2019, 01, 03), Period::M3), Date::from(2023, 01, 04)), Some(Date::from(2023, 01, 03)));
        assert_eq!(closest_rep(Event::from(Date::from(2019, 01, 03), Period::M3), Date::from(2023, 01, 05)), Some(Date::from(2023, 01, 03)));
    }

    #[test]
    fn test_closest_rep_6m() {
        assert_eq!(closest_rep(Event::from(Date::from(2019, 01, 03), Period::M6), Date::from(2023, 07, 02)), Some(Date::from(2023, 01, 03)));
        assert_eq!(closest_rep(Event::from(Date::from(2019, 01, 03), Period::M6), Date::from(2023, 07, 03)), Some(Date::from(2023, 07, 03)));
        assert_eq!(closest_rep(Event::from(Date::from(2019, 01, 03), Period::M6), Date::from(2023, 07, 04)), Some(Date::from(2023, 07, 03)));
        assert_eq!(closest_rep(Event::from(Date::from(2019, 01, 03), Period::M6), Date::from(2023, 07, 05)), Some(Date::from(2023, 07, 03)));
    }

    #[test]
    fn test_closest_rep_1y() {
        assert_eq!(closest_rep(Event::from(Date::from(2019, 08, 08), Period::Y1), Date::from(2023, 08, 07)), Some(Date::from(2022, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date::from(2019, 08, 08), Period::Y1), Date::from(2023, 08, 08)), Some(Date::from(2023, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date::from(2019, 08, 08), Period::Y1), Date::from(2023, 08, 09)), Some(Date::from(2023, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date::from(2019, 08, 08), Period::Y1), Date::from(2023, 08, 10)), Some(Date::from(2023, 08, 08)));
    }

    #[test]
    fn test_closest_rep_2y() {
        assert_eq!(closest_rep(Event::from(Date::from(2019, 08, 08), Period::Y2), Date::from(2023, 08, 07)), Some(Date::from(2021, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date::from(2019, 08, 08), Period::Y2), Date::from(2023, 08, 08)), Some(Date::from(2023, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date::from(2019, 08, 08), Period::Y2), Date::from(2023, 08, 09)), Some(Date::from(2023, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date::from(2019, 08, 08), Period::Y2), Date::from(2023, 08, 10)), Some(Date::from(2023, 08, 08)));
    }

    #[test]
    fn rep_1D() {
        assert_eq!(rep(Event::from(Date::from(1999, 12, 31), Period::D1), 1), Some(Date::from(2000, 01, 01)));
        assert_eq!(rep(Event::from(Date::from(2000, 01, 01), Period::D1)), Some(Date::from(2000, 01, 02)));
        assert_eq!(rep(Event::from(Date::from(2020, 02, 28), Period::D1)), Some(Date::from(2020, 02, 29)));
        assert_eq!(rep(Event::from(Date::from(2020, 02, 29), Period::D1)), Some(Date::from(2020, 03, 01)));
        assert_eq!(rep(Event::from(Date::from(2021, 02, 28), Period::D1)), Some(Date::from(2021, 03, 01)));
        assert_eq!(rep(Event::from(Date::from(2021, 03, 01), Period::D1)), Some(Date::from(2021, 03, 02)));
    }

    #[test]
    fn rep_2D() {
        assert_eq!(rep(Event::from(Date::from(1999, 12, 31), Period::D2)), Some(Date::from(2000, 01, 02)));
        assert_eq!(rep(Event::from(Date::from(2000, 01, 01), Period::D2)), Some(Date::from(2000, 01, 03)));
        assert_eq!(rep(Event::from(Date::from(2020, 02, 27), Period::D2)), Some(Date::from(2020, 02, 29)));
        assert_eq!(rep(Event::from(Date::from(2020, 02, 28), Period::D2)), Some(Date::from(2020, 03, 01)));
        assert_eq!(rep(Event::from(Date::from(2020, 02, 29), Period::D2)), Some(Date::from(2020, 03, 02)));
        assert_eq!(rep(Event::from(Date::from(2021, 02, 27), Period::D2)), Some(Date::from(2021, 03, 01)));
        assert_eq!(rep(Event::from(Date::from(2021, 02, 28), Period::D2)), Some(Date::from(2021, 03, 02)));
        assert_eq!(rep(Event::from(Date::from(2021, 03, 01), Period::D2)), Some(Date::from(2021, 03, 03)));
    }

    #[test]
    fn rep_1W() {
        assert_eq!(rep(Event::from(Date::from(1999, 12, 24), Period::W1)), Some(Date::from(1999, 12, 31)));
        assert_eq!(rep(Event::from(Date::from(1999, 12, 25), Period::W1)), Some(Date::from(2000, 01, 01)));
        assert_eq!(rep(Event::from(Date::from(2000, 01, 01), Period::W1)), Some(Date::from(2000, 01, 08)));
        assert_eq!(rep(Event::from(Date::from(2020, 02, 21), Period::W1)), Some(Date::from(2020, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2020, 02, 22), Period::W1)), Some(Date::from(2020, 02, 29)));
        assert_eq!(rep(Event::from(Date::from(2020, 02, 23), Period::W1)), Some(Date::from(2020, 03, 01)));
        assert_eq!(rep(Event::from(Date::from(2020, 02, 24), Period::W1)), Some(Date::from(2020, 03, 02)));
        assert_eq!(rep(Event::from(Date::from(2021, 02, 21), Period::W1)), Some(Date::from(2021, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2021, 02, 22), Period::W1)), Some(Date::from(2021, 03, 01)));
        assert_eq!(rep(Event::from(Date::from(2021, 02, 23), Period::W1)), Some(Date::from(2021, 03, 02)));
        assert_eq!(rep(Event::from(Date::from(2021, 02, 24), Period::W1)), Some(Date::from(2021, 03, 03)));
    }

    #[test]
    fn rep_1M() {
        assert_eq!(rep(Event::from(Date::from(2000, 01, 01), Period::M1)), Some(Date::from(2000, 02, 01)));
        assert_eq!(rep(Event::from(Date::from(2019, 01, 28), Period::M1)), Some(Date::from(2019, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2019, 01, 29), Period::M1)), Some(Date::from(2019, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2019, 01, 30), Period::M1)), Some(Date::from(2019, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2019, 01, 31), Period::M1)), Some(Date::from(2019, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2020, 01, 28), Period::M1)), Some(Date::from(2020, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2020, 01, 29), Period::M1)), Some(Date::from(2020, 02, 29)));
        assert_eq!(rep(Event::from(Date::from(2020, 01, 30), Period::M1)), Some(Date::from(2020, 02, 29)));
        assert_eq!(rep(Event::from(Date::from(2020, 01, 31), Period::M1)), Some(Date::from(2020, 02, 29)));
        assert_eq!(rep(Event::from(Date::from(2020, 01, 31), Period::M1)), Some(Date::from(2020, 02, 29)));
        assert_eq!(rep(Event::from(Date::from(2020, 02, 29), Period::M1)), Some(Date::from(2020, 03, 29)));
        assert_eq!(rep(Event::from(Date::from(2020, 03, 31), Period::M1)), Some(Date::from(2020, 04, 30)));
        assert_eq!(rep(Event::from(Date::from(2020, 04, 30), Period::M1)), Some(Date::from(2020, 05, 30)));
    }

    #[test]
    fn rep_3M() {
        assert_eq!(rep(Event::from(Date::from(1999, 11, 30), Period::M3)), Some(Date::from(2000, 02, 29)));
        assert_eq!(rep(Event::from(Date::from(2000, 02, 29), Period::M3)), Some(Date::from(2000, 05, 29)));
        assert_eq!(rep(Event::from(Date::from(2000, 05, 29), Period::M3)), Some(Date::from(2000, 08, 29)));
        assert_eq!(rep(Event::from(Date::from(2000, 08, 29), Period::M3)), Some(Date::from(2000, 11, 29)));
        assert_eq!(rep(Event::from(Date::from(2020, 01, 31), Period::M3)), Some(Date::from(2020, 04, 30)));
        assert_eq!(rep(Event::from(Date::from(2020, 02, 29), Period::M3)), Some(Date::from(2020, 05, 29)));
        assert_eq!(rep(Event::from(Date::from(2020, 03, 31), Period::M3)), Some(Date::from(2020, 06, 30)));
        assert_eq!(rep(Event::from(Date::from(2020, 04, 30), Period::M3)), Some(Date::from(2020, 07, 30)));
    }

    #[test]
    fn rep_6M() {
        assert_eq!(rep(Event::from(Date::from(1999, 08, 31), Period::M6)), Some(Date::from(2000, 02, 29)));
        assert_eq!(rep(Event::from(Date::from(2000, 02, 29), Period::M6)), Some(Date::from(2000, 08, 29)));
        assert_eq!(rep(Event::from(Date::from(2000, 08, 29), Period::M6)), Some(Date::from(2001, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2001, 02, 28), Period::M6)), Some(Date::from(2001, 08, 28)));
        assert_eq!(rep(Event::from(Date::from(2020, 01, 31), Period::M6)), Some(Date::from(2020, 07, 31)));
        assert_eq!(rep(Event::from(Date::from(2020, 02, 29), Period::M6)), Some(Date::from(2020, 08, 29)));
        assert_eq!(rep(Event::from(Date::from(2020, 03, 31), Period::M6)), Some(Date::from(2020, 09, 30)));
        assert_eq!(rep(Event::from(Date::from(2020, 04, 30), Period::M6)), Some(Date::from(2020, 10, 30)));
    }

    #[test]
    fn rep_1Y() {
        assert_eq!(rep(Event::from(Date::from(2000, 01, 01), Period::Y1)), Some(Date::from(2001, 01, 01)));
        assert_eq!(rep(Event::from(Date::from(2019, 02, 28), Period::Y1)), Some(Date::from(2020, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2020, 02, 28), Period::Y1)), Some(Date::from(2021, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2021, 02, 28), Period::Y1)), Some(Date::from(2022, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2019, 02, 28), Period::Y1)), Some(Date::from(2020, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2020, 02, 29), Period::Y1)), Some(Date::from(2021, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2021, 02, 28), Period::Y1)), Some(Date::from(2022, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2019, 06, 30), Period::Y1)), Some(Date::from(2020, 06, 30)));
        assert_eq!(rep(Event::from(Date::from(2020, 06, 30), Period::Y1)), Some(Date::from(2021, 06, 30)));
        assert_eq!(rep(Event::from(Date::from(2021, 06, 30), Period::Y1)), Some(Date::from(2022, 06, 30)));
        assert_eq!(rep(Event::from(Date::from(2019, 08, 31), Period::Y1)), Some(Date::from(2020, 08, 31)));
        assert_eq!(rep(Event::from(Date::from(2020, 08, 31), Period::Y1)), Some(Date::from(2021, 08, 31)));
        assert_eq!(rep(Event::from(Date::from(2021, 08, 31), Period::Y1)), Some(Date::from(2022, 08, 31)));
    }

    #[test]
    fn rep_2Y() {
        assert_eq!(rep(Event::from(Date::from(2000, 01, 01), Period::Y2)), Some(Date::from(2002, 01, 01)));
        assert_eq!(rep(Event::from(Date::from(2018, 02, 28), Period::Y2)), Some(Date::from(2020, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2019, 02, 28), Period::Y2)), Some(Date::from(2021, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2020, 02, 28), Period::Y2)), Some(Date::from(2022, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2021, 02, 28), Period::Y2)), Some(Date::from(2023, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2018, 02, 28), Period::Y2)), Some(Date::from(2020, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2019, 02, 28), Period::Y2)), Some(Date::from(2021, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2020, 02, 29), Period::Y2)), Some(Date::from(2022, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2021, 02, 28), Period::Y2)), Some(Date::from(2023, 02, 28)));
        assert_eq!(rep(Event::from(Date::from(2018, 06, 30), Period::Y2)), Some(Date::from(2020, 06, 30)));
        assert_eq!(rep(Event::from(Date::from(2019, 06, 30), Period::Y2)), Some(Date::from(2021, 06, 30)));
        assert_eq!(rep(Event::from(Date::from(2020, 06, 30), Period::Y2)), Some(Date::from(2022, 06, 30)));
        assert_eq!(rep(Event::from(Date::from(2021, 06, 30), Period::Y2)), Some(Date::from(2023, 06, 30)));
        assert_eq!(rep(Event::from(Date::from(2018, 08, 31), Period::Y2)), Some(Date::from(2020, 08, 31)));
        assert_eq!(rep(Event::from(Date::from(2019, 08, 31), Period::Y2)), Some(Date::from(2021, 08, 31)));
        assert_eq!(rep(Event::from(Date::from(2020, 08, 31), Period::Y2)), Some(Date::from(2022, 08, 31)));
        assert_eq!(rep(Event::from(Date::from(2021, 08, 31), Period::Y2)), Some(Date::from(2023, 08, 31)));
    }

    #[test]
    fn rep_none() {
        assert_eq!(rep(Event::from(Date::from(2000, 01, 01), freq: None }), None);
    }

    #[test]
    fn rep_in_period_1D() {
        assert_eq!(
            rep_in_period(Event::from(Date::from(2023, 07, 01), freq: Some(Period::D1) }, Date::from(2023, 08, 01), Date::from(2023, 08, 31)),
            vec![
                Date::from(2023, 08, 01),
                Date::from(2023, 08, 02),
                Date::from(2023, 08, 03),
                Date::from(2023, 08, 04),
                Date::from(2023, 08, 05),
                Date::from(2023, 08, 06),
                Date::from(2023, 08, 07),
                Date::from(2023, 08, 08),
                Date::from(2023, 08, 09),
                Date::from(2023, 08, 10),
                Date::from(2023, 08, 11),
                Date::from(2023, 08, 12),
                Date::from(2023, 08, 13),
                Date::from(2023, 08, 14),
                Date::from(2023, 08, 15),
                Date::from(2023, 08, 16),
                Date::from(2023, 08, 17),
                Date::from(2023, 08, 18),
                Date::from(2023, 08, 19),
                Date::from(2023, 08, 20),
                Date::from(2023, 08, 21),
                Date::from(2023, 08, 22),
                Date::from(2023, 08, 23),
                Date::from(2023, 08, 24),
                Date::from(2023, 08, 25),
                Date::from(2023, 08, 26),
                Date::from(2023, 08, 27),
                Date::from(2023, 08, 28),
                Date::from(2023, 08, 29),
                Date::from(2023, 08, 30),
                Date::from(2023, 08, 31),
            ],
        );
        assert_eq!(
            rep_in_period(Event::from(Date::from(2023, 07, 20), freq: Some(Period::D1) }, Date::from(2023, 07, 01), Date::from(2023, 07, 31)),
            vec![
                Date::from(2023, 07, 20),
                Date::from(2023, 07, 21),
                Date::from(2023, 07, 22),
                Date::from(2023, 07, 23),
                Date::from(2023, 07, 24),
                Date::from(2023, 07, 25),
                Date::from(2023, 07, 26),
                Date::from(2023, 07, 27),
                Date::from(2023, 07, 28),
                Date::from(2023, 07, 29),
                Date::from(2023, 07, 30),
                Date::from(2023, 07, 31),
            ],
        );
    }

    #[test]
    fn rep_in_period_2D() {
        assert_eq!(
            rep_in_period(Event::from(Date::from(2023, 07, 01), freq: Some(Period::D2) }, Date::from(2023, 08, 01), Date::from(2023, 08, 31)),
            vec![
               Date::from(2023, 08, 02),
               Date::from(2023, 08, 04),
               Date::from(2023, 08, 06),
               Date::from(2023, 08, 08),
               Date::from(2023, 08, 10),
               Date::from(2023, 08, 12),
               Date::from(2023, 08, 14),
               Date::from(2023, 08, 16),
               Date::from(2023, 08, 18),
               Date::from(2023, 08, 20),
               Date::from(2023, 08, 22),
               Date::from(2023, 08, 24),
               Date::from(2023, 08, 26),
               Date::from(2023, 08, 28),
               Date::from(2023, 08, 30),
            ],
        );
        assert_eq!(
            rep_in_period(Event::from(Date::from(2023, 07, 20), freq: Some(Period::D2) }, Date::from(2023, 07, 01), Date::from(2023, 07, 31)),
            vec![
                Date::from(2023, 07, 20),
                Date::from(2023, 07, 22),
                Date::from(2023, 07, 24),
                Date::from(2023, 07, 26),
                Date::from(2023, 07, 28),
                Date::from(2023, 07, 30)
            ],
        );
    }

    #[test]
    fn rep_in_period_1W() {
        assert_eq!(
            rep_in_period(Event::from(Date::from(2023, 07, 01), freq: Some(Period::W1) }, Date::from(2023, 08, 01), Date::from(2023, 08, 31)),
            vec![
                Date::from(2023, 08, 05),
                Date::from(2023, 08, 12),
                Date::from(2023, 08, 19),
                Date::from(2023, 08, 26)
            ]
        );
        assert_eq!(
            rep_in_period(Event::from(Date::from(2023, 08, 16), freq: Some(Period::W1) }, Date::from(2023, 08, 01), Date::from(2023, 08, 31)),
            vec![
                Date::from(2023, 08, 16),
                Date::from(2023, 08, 23),
                Date::from(2023, 08, 30)
            ]
    );
    }

    #[test]
    fn rep_in_period_1M() {
        assert_eq!(rep_in_period(Event::from(Date::from(2023, 06, 10), freq: Some(Period::M1) }, Date::from(2023, 08, 01), Date::from(2023, 08, 31)), [Date::from(2023, 08, 10)],);
        assert_eq!(rep_in_period(Event::from(Date::from(2020, 01, 28), freq: Some(Period::M1) }, Date::from(2020, 02, 01), Date::from(2020, 02, 29)), [Date::from(2020, 02, 28)],);
        assert_eq!(rep_in_period(Event::from(Date::from(2020, 01, 29), freq: Some(Period::M1) }, Date::from(2020, 02, 01), Date::from(2020, 02, 29)), [Date::from(2020, 02, 29)],);
        assert_eq!(rep_in_period(Event::from(Date::from(2020, 01, 30), freq: Some(Period::M1) }, Date::from(2020, 02, 01), Date::from(2020, 02, 29)), [Date::from(2020, 02, 29)],);
        assert_eq!(rep_in_period(Event::from(Date::from(2020, 01, 31), freq: Some(Period::M1) }, Date::from(2020, 02, 01), Date::from(2020, 02, 29)), [Date::from(2020, 02, 29)],);
        assert_eq!(rep_in_period(Event::from(Date::from(2023, 08, 10), freq: Some(Period::M1) }, Date::from(2023, 08, 01), Date::from(2023, 08, 31)), [Date::from(2023, 08, 10)],);
    }

    #[test]
    fn rep_in_period_3M() {
        assert_eq!(rep_in_period(Event::from(Date::from(2020, 01, 28), freq: Some(Period::M3) }, Date::from(2020, 03, 01), Date::from(2020, 03, 31)), []);
        assert_eq!(rep_in_period(Event::from(Date::from(2020, 01, 28), freq: Some(Period::M3) }, Date::from(2020, 04, 01), Date::from(2020, 04, 30)),vec![Date::from(2020, 04, 28)],);
        assert_eq!(rep_in_period(Event::from(Date::from(2020, 01, 29), freq: Some(Period::M3) }, Date::from(2020, 04, 01), Date::from(2020, 04, 30)),vec![Date::from(2020, 04, 29)],);
        assert_eq!(rep_in_period(Event::from(Date::from(2020, 01, 30), freq: Some(Period::M3) }, Date::from(2020, 04, 01), Date::from(2020, 04, 30)),vec![Date::from(2020, 04, 30)],);
        assert_eq!(rep_in_period(Event::from(Date::from(2020, 01, 31), freq: Some(Period::M3) }, Date::from(2020, 04, 01), Date::from(2020, 04, 30)),vec![Date::from(2020, 04, 30)],);
        assert_eq!(rep_in_period(Event::from(Date::from(2020, 04, 10), freq: Some(Period::M3) }, Date::from(2020, 04, 01), Date::from(2020, 04, 30)),vec![Date::from(2020, 04, 10)],);
    }

    #[test]
    fn rep_in_period_6M() {
        assert_eq!(rep_in_period(Event::from(Date::from(2020, 01, 31), freq: Some(Period::M6) }, Date::from(2020, 03, 01), Date::from(2020, 03, 31)), []);
        assert_eq!(rep_in_period(Event::from(Date::from(2020, 01, 31), freq: Some(Period::M6) }, Date::from(2020, 07, 01), Date::from(2020, 07, 31)),vec![Date::from(2020, 07, 31)],);
        assert_eq!(rep_in_period(Event::from(Date::from(2020, 07, 31), freq: Some(Period::M6) }, Date::from(2021, 01, 01), Date::from(2021, 01, 31)),vec![Date::from(2021, 01, 31)],);
        assert_eq!(rep_in_period(Event::from(Date::from(2023, 06, 29), freq: Some(Period::M6) }, Date::from(2023, 06, 01), Date::from(2023, 06, 30)),vec![Date::from(2023, 06, 29)],);
    }

    #[test]
    fn rep_in_period_1Y() {
        assert_eq!(rep_in_period(Event::from(Date::from(2019, 02, 28), freq: Some(Period::Y1) }, Date::from(2020, 01, 01), Date::from(2020, 01, 31)), []);
        assert_eq!(rep_in_period(Event::from(Date::from(2019, 02, 28), freq: Some(Period::Y1) }, Date::from(2025, 02, 01), Date::from(2025, 02, 28)),vec![Date::from(2025, 02, 28)],);
        assert_eq!(rep_in_period(Event::from(Date::from(2020, 02, 29), freq: Some(Period::Y1) }, Date::from(2025, 02, 01), Date::from(2025, 02, 28)),vec![Date::from(2025, 02, 28)],);
        assert_eq!(rep_in_period(Event::from(Date::from(2021, 02, 28), freq: Some(Period::Y1) }, Date::from(2025, 02, 01), Date::from(2025, 02, 28)),vec![Date::from(2025, 02, 28)],);
        assert_eq!(rep_in_period(Event::from(Date::from(2022, 02, 28), freq: Some(Period::Y1) }, Date::from(2025, 02, 01), Date::from(2025, 02, 28)),vec![Date::from(2025, 02, 28)],);
        assert_eq!(rep_in_period(Event::from(Date::from(2021, 11, 11), freq: Some(Period::Y1) }, Date::from(2021, 11, 01), Date::from(2021, 11, 30)),vec![Date::from(2021, 11, 11)],);
    }

    #[test]
    fn rep_in_period_2Y() {
        assert_eq!(rep_in_period(Event::from(Date::from(2020, 01, 31), freq: Some(Period::Y2) }, Date::from(2020, 07, 01), Date::from(2020, 07, 30)), []);
        assert_eq!(rep_in_period(Event::from(Date::from(2020, 01, 31), freq: Some(Period::Y2) }, Date::from(2022, 01, 01), Date::from(2022, 01, 31)),vec![Date::from(2022, 01, 31)],);
        assert_eq!(rep_in_period(Event::from(Date::from(2020, 07, 15), freq: Some(Period::Y2) }, Date::from(2020, 07, 01), Date::from(2021, 07, 31)),vec![Date::from(2020, 07, 15)],);
    }

    #[test]
    fn rep_in_period_none() {
        assert_eq!(rep_in_period(Event::from(Date::from(2000, 01, 01), freq: None }, Date::from(2023, 08, 01), Date::from(2023, 08, 31)),vec![]);
        assert_eq!(rep_in_period(Event::from(Date::from(2023, 08, 22), freq: None }, Date::from(2023, 08, 01), Date::from(2023, 08, 31)),[Date::from(2023, 08, 22)],);
    }

    #[test]
    fn rep_in_period_between_repetition() {
        assert_eq!(rep_in_period(Event::from(Date::from(2008, 03, 01), freq: Some(Period::M3) }, Date::from(2008, 04, 01), Date::from(2008, 04, 30)), []);
        assert_eq!(rep_in_period(Event::from(Date::from(2009, 04, 01), freq: Some(Period::M6) }, Date::from(2009, 08, 01), Date::from(2009, 08, 31)), []);
        assert_eq!(rep_in_period(Event::from(Date::from(2010, 05, 01), freq: Some(Period::Y1) }, Date::from(2011, 04, 01), Date::from(2011, 04, 30)), []);
        assert_eq!(rep_in_period(Event::from(Date::from(2011, 06, 01), freq: Some(Period::Y2) }, Date::from(2012, 06, 01), Date::from(2012, 06, 30)), []);
    }

    #[test]
    fn rep_in_period_before_date() {
        assert_eq!(rep_in_period(Event::from(Date::from(2000, 01, 01), freq: Some(Period::D1) }, Date::from(1999, 12, 01), Date::from(1999, 12, 31)), []);
        assert_eq!(rep_in_period(Event::from(Date::from(2023, 06, 01), freq: Some(Period::D2) }, Date::from(2023, 05, 01), Date::from(2023, 05, 31)), []);
        assert_eq!(rep_in_period(Event::from(Date::from(2023, 07, 01), freq: Some(Period::W1) }, Date::from(2023, 06, 01), Date::from(2023, 06, 30)), []);
        assert_eq!(rep_in_period(Event::from(Date::from(2021, 04, 01), freq: Some(Period::M1) }, Date::from(2021, 03, 01), Date::from(2021, 03, 31)), []);
        assert_eq!(rep_in_period(Event::from(Date::from(2008, 03, 01), freq: Some(Period::M3) }, Date::from(2008, 02, 01), Date::from(2008, 02, 29)), []);
        assert_eq!(rep_in_period(Event::from(Date::from(2009, 10, 01), freq: Some(Period::M6) }, Date::from(2009, 09, 01), Date::from(2009, 09, 30)), []);
        assert_eq!(rep_in_period(Event::from(Date::from(2010, 09, 01), freq: Some(Period::Y1) }, Date::from(2010, 08, 01), Date::from(2010, 08, 31)), []);
        assert_eq!(rep_in_period(Event::from(Date::from(2011, 08, 01), freq: Some(Period::Y2) }, Date::from(2011, 07, 01), Date::from(2011, 07, 31)), []);
    }

    #[test]
    fn rep_lazy_1d() {
        let it = rep_lazy(Event::from(Date::from(2000, 01, 01), freq: Some(Period::D1) });
        assert_eq!(it.next().value, Date::from(2000, 01, 02));
        assert_eq!(it.next().value, Date::from(2000, 01, 03));
        assert_eq!(it.next().value, Date::from(2000, 01, 04));
        assert_eq!(it.next().value, Date::from(2000, 01, 05));
        assert_eq!(it.next().value, Date::from(2000, 01, 06));
    }

    #[test]
    fn rep_lazy_1d() {
        let it = rep_lazy(Event::from(Date::from(2020, 02, 27), freq: Some(Period::D1) });
        assert_eq!(it.next().value, Date::from(2020, 02, 28));
        assert_eq!(it.next().value, Date::from(2020, 02, 29));
        assert_eq!(it.next().value, Date::from(2020, 03, 01));
        assert_eq!(it.next().value, Date::from(2020, 03, 02));
    }

    #[test]
    fn rep_lazy_1d() {
        let it = rep_lazy(Event::from(Date::from(2021, 02, 27), freq: Some(Period::D1) });
        assert_eq!(it.next().value, Date::from(2021, 02, 28));
        assert_eq!(it.next().value, Date::from(2021, 03, 01));
        assert_eq!(it.next().value, Date::from(2021, 03, 02));
    }

    #[test]
    fn rep_lazy_2d() {
        let it = rep_lazy(Event::from(Date::from(2000, 01, 01), freq: Some(Period::D2) });
        assert_eq!(it.next().value, Date::from(2000, 01, 03));
        assert_eq!(it.next().value, Date::from(2000, 01, 05));
        assert_eq!(it.next().value, Date::from(2000, 01, 07));
        assert_eq!(it.next().value, Date::from(2000, 01, 09));
        assert_eq!(it.next().value, Date::from(2000, 01, 11));
    }

    #[test]
    fn rep_lazy_2d() {
        let it = rep_lazy(Event::from(Date::from(2020, 02, 27), freq: Some(Period::D2) });
        assert_eq!(it.next().value, Date::from(2020, 02, 29));
        assert_eq!(it.next().value, Date::from(2020, 03, 02));
    }

    #[test]
    fn rep_lazy_2d() {
        let it = rep_lazy(Event::from(Date::from(2021, 02, 27), Some(Period::D2) });
        assert_eq!(it.next().value, Date::from(2021, 03, 01));
    }

    #[test]
    fn rep_lazy_1w() {
        let it = rep_lazy(Event::from(Date::from(2000, 01, 01), Some(Period::W1) });
        assert_eq!(it.next().value, Date::from(2000, 01, 08));
        assert_eq!(it.next().value, Date::from(2000, 01, 15));
        assert_eq!(it.next().value, Date::from(2000, 01, 22));
        assert_eq!(it.next().value, Date::from(2000, 01, 29));
        assert_eq!(it.next().value, Date::from(2000, 02, 05));
    }

    #[test]
    fn rep_lazy_1w() {
        let it = rep_lazy(Event::from(Date::from(2020, 02, 21), Some(Period::W1) });
        assert_eq!(it.next().value, Date::from(2020, 02, 28));
        assert_eq!(it.next().value, Date::from(2020, 03, 06));
    }

    #[test]
    fn rep_lazy_1w() {
        let it = rep_lazy(Event::from(Date::from(2021, 02, 21), Some(Period::W1) });
        assert_eq!(it.next().value, Date::from(2021, 02, 28));
        assert_eq!(it.next().value, Date::from(2021, 03, 07));
    }

    #[test]
    fn rep_lazy_1m() {
        let it = rep_lazy(Event::from(Date::from(2000, 01, 01), Some(Period::M1) });
        assert_eq!(it.next().value, Date::from(2000, 02, 01));
        assert_eq!(it.next().value, Date::from(2000, 03, 01));
        assert_eq!(it.next().value, Date::from(2000, 04, 01));
        assert_eq!(it.next().value, Date::from(2000, 05, 01));
        assert_eq!(it.next().value, Date::from(2000, 06, 01));
    }

    #[test]
    fn rep_lazy_1m() {
        let it = rep_lazy(Event::from(Date::from(2020, 01, 31) , Some(Period::M1) });
        assert_eq!(it.next().value, Date::from(2020, 02, 29));
        assert_eq!(it.next().value, Date::from(2020, 03, 31));
    }

    #[test]
    fn rep_lazy_1m() {
        let it = rep_lazy(Event::from(Date::from(2021, 01, 31) , Some(Period::M1) });
        assert_eq!(it.next().value, Date::from(2021, 02, 28));
        assert_eq!(it.next().value, Date::from(2021, 03, 31));
    }

    #[test]
    fn rep_lazy_3m() {
        let it = rep_lazy(Event::from(Date::from(2000, 01, 01) , Some(Period::M3) });
        assert_eq!(it.next().value, Date::from(2000, 04, 01));
        assert_eq!(it.next().value, Date::from(2000, 07, 01));
        assert_eq!(it.next().value, Date::from(2000, 10, 01));
        assert_eq!(it.next().value, Date::from(2001, 01, 01));
        assert_eq!(it.next().value, Date::from(2001, 04, 01));
    }

    #[test]
    fn rep_lazy_3m() {
        let it = rep_lazy(Event::from(Date::from(2019, 11, 30) , Some(Period::M3) });
        assert_eq!(it.next().value, Date::from(2020, 02, 29));
        assert_eq!(it.next().value, Date::from(2020, 05, 30));
        assert_eq!(it.next().value, Date::from(2020, 08, 30));
        assert_eq!(it.next().value, Date::from(2020, 11, 30));
    }

    #[test]
    fn rep_lazy_6m() {
        let it = rep_lazy(Event::from(Date::from(2000, 01, 01) , Some(Period::M6) });
        assert_eq!(it.next().value, Date::from(2000, 07, 01));
        assert_eq!(it.next().value, Date::from(2001, 01, 01));
        assert_eq!(it.next().value, Date::from(2001, 07, 01));
        assert_eq!(it.next().value, Date::from(2002, 01, 01));
        assert_eq!(it.next().value, Date::from(2002, 07, 01));
    }

    #[test]
    fn rep_lazy_6m() {
        let it = rep_lazy(Event::from(Date::from(2019, 08, 31) , Some(Period::M6) });
        assert_eq!(it.next().value, Date::from(2020, 02, 29));
        assert_eq!(it.next().value, Date::from(2020, 08, 31));
        assert_eq!(it.next().value, Date::from(2021, 02, 28));
        assert_eq!(it.next().value, Date::from(2021, 08, 31));
    }

    #[test]
    fn rep_lazy_1y() {
        let it = rep_lazy(Event::from(Date::from(2000, 01, 01) , Some(Period::Y1) });
        assert_eq!(it.next().value, Date::from(2001, 01, 01));
        assert_eq!(it.next().value, Date::from(2002, 01, 01));
        assert_eq!(it.next().value, Date::from(2003, 01, 01));
        assert_eq!(it.next().value, Date::from(2004, 01, 01));
        assert_eq!(it.next().value, Date::from(2005, 01, 01));
    }

    #[test]
    fn rep_lazy_1y() {
        let it = rep_lazy(Event::from(Date::from(2020, 02, 29) , Some(Period::Y1) });
        assert_eq!(it.next().value, Date::from(2021, 02, 28));
        assert_eq!(it.next().value, Date::from(2022, 02, 28));
        assert_eq!(it.next().value, Date::from(2023, 02, 28));
        assert_eq!(it.next().value, Date::from(2024, 02, 29));
    }

    #[test]
    fn rep_lazy_2y() {
        let it = rep_lazy(Event::from(Date::from(2000, 01, 01) , Some(Period::Y2)));
        assert_eq!(it.next().value, Date::from(2002, 01, 01));
        assert_eq!(it.next().value, Date::from(2004, 01, 01));
        assert_eq!(it.next().value, Date::from(2006, 01, 01));
        assert_eq!(it.next().value, Date::from(2008, 01, 01));
        assert_eq!(it.next().value, Date::from(2010, 01, 01));
    }

    #[test]
    fn rep_lazy_2y() {
        let it = rep_lazy(Event::from(Date::from(2020, 02, 29) , Some(Period::Y2)));
        assert_eq!(it.next().value, Date::from(2022, 02, 28));
        assert_eq!(it.next().value, Date::from(2024, 02, 29));
    }

    #[test]
    fn rep_lazy_none() {
        let it = rep_lazy(Event::from(Date::from(2000, 01, 01), None));
        assert_eq!(it.next().value, None);
        assert_eq!(it.next().value, None);
        assert_eq!(it.next().value, None);
        assert_eq!(it.next().value, None);
        assert_eq!(it.next().value, None);
    }
}
    */
