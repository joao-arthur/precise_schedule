use chrono::{Datelike, Days, Months, NaiveDate, TimeDelta};

#[derive(Debug, PartialEq)]
pub enum Period {
    D1,
    D2,
    W1,
    M1,
    M3,
    M6,
    Y1,
    Y2,
}

#[derive(Debug, PartialEq)]
pub struct Date(u16, u8, u8);

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

pub fn closest_rep(evt: Event, date: Date) -> Option<Date> {
    let base_date = NaiveDate::from_ymd_opt(i32::from(evt.dt.0), u32::from(evt.dt.1), u32::from(evt.dt.2)).unwrap();
    let date = NaiveDate::from_ymd_opt(i32::from(date.0), u32::from(date.1), u32::from(date.2)).unwrap();
    
    if date < base_date {
        return None
    }
    if date == base_date {
        return Some(
            Date(
                base_date.year() as u16,
                base_date.month0() as u8 +1,
                base_date.day0() as u8+1
            )
        );
    }

    let diff = date - base_date;


    let d = diff.num_days() -1;
    let w = (diff.num_days() -1) / 7;
    let m = ((diff.num_days() -1) / 30) -1;
    let y = ((diff.num_days()-1) / 365) -1;
    println!("evt {} date {} num_days {} | d {} w {} m {} y {}", base_date, date,diff.num_days(), d, w, m, y);
    
    let res = match evt.freq {
        Some(Period::D1) => Some(date - Days::new(1)),
        Some(Period::D2) => Some(date - Days::new((d % 2) as u64)),
        Some(Period::W1) => Some(base_date + TimeDelta::try_weeks(w).unwrap()),
        Some(Period::M1) => Some(base_date + Months::new(m as u32)),
        Some(Period::M3) => Some(base_date + Months::new((m - (m % 3)) as u32)),
        Some(Period::M6) => Some(base_date + Months::new((m - (m % 6)) as u32)),
        Some(Period::Y1) => Some(base_date + Months::new((y * 12) as u32)),
        Some(Period::Y2) => Some(base_date + Months::new((y * 12 - ((y* 12) % 2)) as u32)),
        None => None
    };

    match res {
        Some(res) => Some(Date(res.year() as u16, res.month0() as u8 +1, res.day0() as u8+1)),
        None => None,
    }
}
/*
pub fn rep(evt: Event, i = 1) -> Option<Date> {
    match (evt.freq) {
        Period::D1 => evt.add({ days: 1 * i })
        Period::D2 => evt.add({ days: 2 * i })
        Period::W1 => evt.add({ days: 7 * i })
        Period::M1 => evt.add({ months: 1 * i })
        Period::M3 => evt.add({ months: 3 * i })
        Period::M6 => evt.add({ months: 6 * i })
        Period::Y1 => evt.add({ years: 1 * i })
        Period::Y2 => evt.add({ years: 2 * i })
    }
    return undefined;
}

pub fn rep_lazy(evt: Event) -> IterableIterator<Option<Date>> {
    let i = 0;

    return {
        next(): IteratorResult<string | undefined> {
            i++;
            const value = rep(evt, i);
            return {
                done: false,
                value,
            };
        },
        vec![Symbol.iterator](): IterableIterator<string | undefined> {
            return this;
        },
    };
}

pub fn rep_in_period(evt: Event, begin: string, end: string) -> Vec<Date> {
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

fn main() {

}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_event() {
        assert_eq!(
            Event::from(Date(2024, 11, 22), Period::M6),
            Event { dt: Date(2024, 11, 22), freq: Some(Period::M6) }
        );
    }

    #[test]
    fn test_closest_rep_none() {
        assert_eq!(closest_rep(Event { dt: Date(2000, 01, 01), freq: None }, Date(2023, 08, 01)), None);
    }

    #[test]
    fn test_clorest_rep_before() {
        assert_eq!(closest_rep(Event::from(Date(2019, 08, 08), Period::D1), Date(2019, 08, 07)), None);
        assert_eq!(closest_rep(Event::from(Date(2019, 08, 08), Period::D2), Date(2019, 08, 07)), None);
        assert_eq!(closest_rep(Event::from(Date(2019, 08, 08), Period::W1), Date(2019, 08, 07)), None);
        assert_eq!(closest_rep(Event::from(Date(2019, 08, 08), Period::M1), Date(2019, 08, 07)), None);
        assert_eq!(closest_rep(Event::from(Date(2019, 08, 08), Period::M3), Date(2019, 08, 07)), None);
        assert_eq!(closest_rep(Event::from(Date(2019, 08, 08), Period::M6), Date(2019, 08, 07)), None);
        assert_eq!(closest_rep(Event::from(Date(2019, 08, 08), Period::Y1), Date(2019, 08, 07)), None);
        assert_eq!(closest_rep(Event::from(Date(2019, 08, 08), Period::Y2), Date(2019, 08, 07)), None);
    }

    #[test]
    fn test_clorest_rep_same_day() {
        assert_eq!(closest_rep(Event::from(Date(2020, 08, 08), Period::D1), Date(2020, 08, 08)), Some(Date(2020, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date(2020, 08, 08), Period::D2), Date(2020, 08, 08)), Some(Date(2020, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date(2020, 08, 08), Period::W1), Date(2020, 08, 08)), Some(Date(2020, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date(2020, 08, 08), Period::M1), Date(2020, 08, 08)), Some(Date(2020, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date(2020, 08, 08), Period::M3), Date(2020, 08, 08)), Some(Date(2020, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date(2020, 08, 08), Period::M6), Date(2020, 08, 08)), Some(Date(2020, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date(2020, 08, 08), Period::Y1), Date(2020, 08, 08)), Some(Date(2020, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date(2020, 08, 08), Period::Y2), Date(2020, 08, 08)), Some(Date(2020, 08, 08)));
    }

    #[test]
    fn test_clorest_rep_exact_day() {
        assert_eq!(closest_rep(Event::from(Date(2021, 08, 08), Period::D1), Date(2021, 08, 09)), Some(Date(2021, 08, 09)));
        assert_eq!(closest_rep(Event::from(Date(2021, 08, 08), Period::D2), Date(2021, 08, 10)), Some(Date(2021, 08, 10)));
        assert_eq!(closest_rep(Event::from(Date(2021, 08, 08), Period::W1), Date(2021, 08, 15)), Some(Date(2021, 08, 15)));
        assert_eq!(closest_rep(Event::from(Date(2021, 08, 08), Period::M1), Date(2021, 09, 08)), Some(Date(2021, 09, 08)));
        assert_eq!(closest_rep(Event::from(Date(2021, 08, 08), Period::M3), Date(2021, 11, 08)), Some(Date(2021, 11, 08)));
        assert_eq!(closest_rep(Event::from(Date(2021, 08, 08), Period::M6), Date(2022, 02, 08)), Some(Date(2022, 02, 08)));
        assert_eq!(closest_rep(Event::from(Date(2021, 08, 08), Period::Y1), Date(2022, 08, 08)), Some(Date(2022, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date(2021, 08, 08), Period::Y2), Date(2023, 08, 08)), Some(Date(2023, 08, 08)));
    }

    #[test]
    fn test_clorest_rep_next_day() {
        assert_eq!(closest_rep(Event::from(Date(2021, 08, 08), Period::D2), Date(2021, 08, 11)), Some(Date(2021, 08, 10)));
        assert_eq!(closest_rep(Event::from(Date(2021, 08, 08), Period::W1), Date(2021, 08, 16)), Some(Date(2021, 08, 15)));
        assert_eq!(closest_rep(Event::from(Date(2021, 08, 08), Period::M1), Date(2021, 09, 09)), Some(Date(2021, 09, 08)));
        assert_eq!(closest_rep(Event::from(Date(2021, 08, 08), Period::M3), Date(2021, 11, 09)), Some(Date(2021, 11, 08)));
        assert_eq!(closest_rep(Event::from(Date(2021, 08, 08), Period::M6), Date(2022, 02, 09)), Some(Date(2022, 02, 08)));
        assert_eq!(closest_rep(Event::from(Date(2021, 08, 08), Period::Y1), Date(2022, 08, 09)), Some(Date(2022, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date(2021, 08, 08), Period::Y2), Date(2023, 08, 09)), Some(Date(2023, 08, 08)));
    }

    #[test]
    fn test_closest_rep_1d() {
        assert_eq!(closest_rep(Event::from(Date(2000, 01, 01), Period::D1), Date(2023, 08, 01)), Some(Date(2023, 08, 01)));
        assert_eq!(closest_rep(Event::from(Date(2000, 01, 01), Period::D1), Date(2023, 08, 02)), Some(Date(2023, 08, 02)));
        assert_eq!(closest_rep(Event::from(Date(2000, 01, 01), Period::D1), Date(2023, 08, 03)), Some(Date(2023, 08, 03)));
        assert_eq!(closest_rep(Event::from(Date(2000, 01, 01), Period::D1), Date(2023, 08, 04)), Some(Date(2023, 08, 04)));
    }
    
    #[test]
    fn test_closest_rep_2d() {
        assert_eq!(closest_rep(Event::from(Date(2023, 06, 01), Period::D2), Date(2023, 06, 02)), Some(Date(2023, 06, 01)));
        assert_eq!(closest_rep(Event::from(Date(2023, 06, 01), Period::D2), Date(2023, 06, 03)), Some(Date(2023, 06, 03)));
        assert_eq!(closest_rep(Event::from(Date(2023, 06, 01), Period::D2), Date(2023, 06, 04)), Some(Date(2023, 06, 03)));
        assert_eq!(closest_rep(Event::from(Date(2023, 06, 01), Period::D2), Date(2023, 06, 05)), Some(Date(2023, 06, 05)));
    }
    
    #[test]
    fn test_closest_rep_1w() {
        assert_eq!(closest_rep(Event::from(Date(2023, 07, 03), Period::W1), Date(2023, 07, 09)), Some(Date(2023, 07, 03)));
        assert_eq!(closest_rep(Event::from(Date(2023, 07, 03), Period::W1), Date(2023, 07, 10)), Some(Date(2023, 07, 10)));
        assert_eq!(closest_rep(Event::from(Date(2023, 07, 03), Period::W1), Date(2023, 07, 11)), Some(Date(2023, 07, 10)));
        assert_eq!(closest_rep(Event::from(Date(2023, 07, 03), Period::W1), Date(2023, 07, 12)), Some(Date(2023, 07, 10)));
    }
    
    #[test]
    fn test_closest_rep_1m() {
        assert_eq!(closest_rep(Event::from(Date(2019, 01, 03), Period::M1), Date(2023, 03, 02)), Some(Date(2023, 02, 03)));
        assert_eq!(closest_rep(Event::from(Date(2019, 01, 03), Period::M1), Date(2023, 03, 03)), Some(Date(2023, 03, 03)));
        assert_eq!(closest_rep(Event::from(Date(2019, 01, 03), Period::M1), Date(2023, 03, 04)), Some(Date(2023, 03, 03)));
        assert_eq!(closest_rep(Event::from(Date(2019, 01, 03), Period::M1), Date(2023, 03, 05)), Some(Date(2023, 03, 03)));
    }
    
    #[test]
    fn test_closest_rep_3m() {
        assert_eq!(closest_rep(Event::from(Date(2019, 01, 03), Period::M3), Date(2023, 01, 02)), Some(Date(2022, 10, 03)));
        assert_eq!(closest_rep(Event::from(Date(2019, 01, 03), Period::M3), Date(2023, 01, 03)), Some(Date(2023, 01, 03)));
        assert_eq!(closest_rep(Event::from(Date(2019, 01, 03), Period::M3), Date(2023, 01, 04)), Some(Date(2023, 01, 03)));
        assert_eq!(closest_rep(Event::from(Date(2019, 01, 03), Period::M3), Date(2023, 01, 05)), Some(Date(2023, 01, 03)));
    }
    
    #[test]
    fn test_closest_rep_6m() {
        assert_eq!(closest_rep(Event::from(Date(2019, 01, 03), Period::M6), Date(2023, 07, 02)), Some(Date(2023, 01, 03)));
        assert_eq!(closest_rep(Event::from(Date(2019, 01, 03), Period::M6), Date(2023, 07, 03)), Some(Date(2023, 07, 03)));
        assert_eq!(closest_rep(Event::from(Date(2019, 01, 03), Period::M6), Date(2023, 07, 04)), Some(Date(2023, 07, 03)));
        assert_eq!(closest_rep(Event::from(Date(2019, 01, 03), Period::M6), Date(2023, 07, 05)), Some(Date(2023, 07, 03)));
    }
    
    #[test]
    fn test_closest_rep_1y() {
        assert_eq!(closest_rep(Event::from(Date(2019, 08, 08), Period::Y1), Date(2023, 08, 07)), Some(Date(2022, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date(2019, 08, 08), Period::Y1), Date(2023, 08, 08)), Some(Date(2023, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date(2019, 08, 08), Period::Y1), Date(2023, 08, 09)), Some(Date(2023, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date(2019, 08, 08), Period::Y1), Date(2023, 08, 10)), Some(Date(2023, 08, 08)));
    }
    
    #[test]
    fn test_closest_rep_2y() {
        assert_eq!(closest_rep(Event::from(Date(2019, 08, 08), Period::Y2), Date(2023, 08, 07)), Some(Date(2021, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date(2019, 08, 08), Period::Y2), Date(2023, 08, 08)), Some(Date(2023, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date(2019, 08, 08), Period::Y2), Date(2023, 08, 09)), Some(Date(2023, 08, 08)));
        assert_eq!(closest_rep(Event::from(Date(2019, 08, 08), Period::Y2), Date(2023, 08, 10)), Some(Date(2023, 08, 08)));
    }

    /*#[test]
    fn rep_1D() {
        assert_eq!(rep(Event::from(Date(1999, 12, 31), Period::D1)), Some(Date(2000, 01, 01)));
        assert_eq!(rep(Event::from(Date(2000, 01, 01), Period::D1)), Some(Date(2000, 01, 02)));
        assert_eq!(rep(Event::from(Date(2020, 02, 28), Period::D1)), Some(Date(2020, 02, 29)));
        assert_eq!(rep(Event::from(Date(2020, 02, 29), Period::D1)), Some(Date(2020, 03, 01)));
        assert_eq!(rep(Event::from(Date(2021, 02, 28), Period::D1)), Some(Date(2021, 03, 01)));
        assert_eq!(rep(Event::from(Date(2021, 03, 01), Period::D1)), Some(Date(2021, 03, 02)));
    }
    
    #[test]
    fn rep_2D() {
        assert_eq!(rep(Event::from(Date(1999, 12, 31), Period::D2)), Some(Date(2000, 01, 02)));
        assert_eq!(rep(Event::from(Date(2000, 01, 01), Period::D2)), Some(Date(2000, 01, 03)));
        assert_eq!(rep(Event::from(Date(2020, 02, 27), Period::D2)), Some(Date(2020, 02, 29)));
        assert_eq!(rep(Event::from(Date(2020, 02, 28), Period::D2)), Some(Date(2020, 03, 01)));
        assert_eq!(rep(Event::from(Date(2020, 02, 29), Period::D2)), Some(Date(2020, 03, 02)));
        assert_eq!(rep(Event::from(Date(2021, 02, 27), Period::D2)), Some(Date(2021, 03, 01)));
        assert_eq!(rep(Event::from(Date(2021, 02, 28), Period::D2)), Some(Date(2021, 03, 02)));
        assert_eq!(rep(Event::from(Date(2021, 03, 01), Period::D2)), Some(Date(2021, 03, 03)));
    }
    
    #[test]
    fn rep_1W() {
        assert_eq!(rep(Event::from(Date(1999, 12, 24), Period::W1)), Some(Date(1999, 12, 31)));
        assert_eq!(rep(Event::from(Date(1999, 12, 25), Period::W1)), Some(Date(2000, 01, 01)));
        assert_eq!(rep(Event::from(Date(2000, 01, 01), Period::W1)), Some(Date(2000, 01, 08)));
        assert_eq!(rep(Event::from(Date(2020, 02, 21), Period::W1)), Some(Date(2020, 02, 28)));
        assert_eq!(rep(Event::from(Date(2020, 02, 22), Period::W1)), Some(Date(2020, 02, 29)));
        assert_eq!(rep(Event::from(Date(2020, 02, 23), Period::W1)), Some(Date(2020, 03, 01)));
        assert_eq!(rep(Event::from(Date(2020, 02, 24), Period::W1)), Some(Date(2020, 03, 02)));
        assert_eq!(rep(Event::from(Date(2021, 02, 21), Period::W1)), Some(Date(2021, 02, 28)));
        assert_eq!(rep(Event::from(Date(2021, 02, 22), Period::W1)), Some(Date(2021, 03, 01)));
        assert_eq!(rep(Event::from(Date(2021, 02, 23), Period::W1)), Some(Date(2021, 03, 02)));
        assert_eq!(rep(Event::from(Date(2021, 02, 24), Period::W1)), Some(Date(2021, 03, 03)));
    }
    
    #[test]
    fn rep_1M() {
        assert_eq!(rep(Event::from(Date(2000, 01, 01), Period::M1)), Some(Date(2000, 02, 01)));
        assert_eq!(rep(Event::from(Date(2019, 01, 28), Period::M1)), Some(Date(2019, 02, 28)));
        assert_eq!(rep(Event::from(Date(2019, 01, 29), Period::M1)), Some(Date(2019, 02, 28)));
        assert_eq!(rep(Event::from(Date(2019, 01, 30), Period::M1)), Some(Date(2019, 02, 28)));
        assert_eq!(rep(Event::from(Date(2019, 01, 31), Period::M1)), Some(Date(2019, 02, 28)));
        assert_eq!(rep(Event::from(Date(2020, 01, 28), Period::M1)), Some(Date(2020, 02, 28)));
        assert_eq!(rep(Event::from(Date(2020, 01, 29), Period::M1)), Some(Date(2020, 02, 29)));
        assert_eq!(rep(Event::from(Date(2020, 01, 30), Period::M1)), Some(Date(2020, 02, 29)));
        assert_eq!(rep(Event::from(Date(2020, 01, 31), Period::M1)), Some(Date(2020, 02, 29)));
        assert_eq!(rep(Event::from(Date(2020, 01, 31), Period::M1)), Some(Date(2020, 02, 29)));
        assert_eq!(rep(Event::from(Date(2020, 02, 29), Period::M1)), Some(Date(2020, 03, 29)));
        assert_eq!(rep(Event::from(Date(2020, 03, 31), Period::M1)), Some(Date(2020, 04, 30)));
        assert_eq!(rep(Event::from(Date(2020, 04, 30), Period::M1)), Some(Date(2020, 05, 30)));
    }

    #[test]
    fn rep_3M() {
        assert_eq!(rep(Event::from(Date(1999, 11, 30), Period::M3)), Some(Date(2000, 02, 29)));
        assert_eq!(rep(Event::from(Date(2000, 02, 29), Period::M3)), Some(Date(2000, 05, 29)));
        assert_eq!(rep(Event::from(Date(2000, 05, 29), Period::M3)), Some(Date(2000, 08, 29)));
        assert_eq!(rep(Event::from(Date(2000, 08, 29), Period::M3)), Some(Date(2000, 11, 29)));
        assert_eq!(rep(Event::from(Date(2020, 01, 31), Period::M3)), Some(Date(2020, 04, 30)));
        assert_eq!(rep(Event::from(Date(2020, 02, 29), Period::M3)), Some(Date(2020, 05, 29)));
        assert_eq!(rep(Event::from(Date(2020, 03, 31), Period::M3)), Some(Date(2020, 06, 30)));
        assert_eq!(rep(Event::from(Date(2020, 04, 30), Period::M3)), Some(Date(2020, 07, 30)));
    }
    
    #[test]
    fn rep_6M() {
        assert_eq!(rep(Event::from(Date(1999, 08, 31), Period::M6)), Some(Date(2000, 02, 29)));
        assert_eq!(rep(Event::from(Date(2000, 02, 29), Period::M6)), Some(Date(2000, 08, 29)));
        assert_eq!(rep(Event::from(Date(2000, 08, 29), Period::M6)), Some(Date(2001, 02, 28)));
        assert_eq!(rep(Event::from(Date(2001, 02, 28), Period::M6)), Some(Date(2001, 08, 28)));
        assert_eq!(rep(Event::from(Date(2020, 01, 31), Period::M6)), Some(Date(2020, 07, 31)));
        assert_eq!(rep(Event::from(Date(2020, 02, 29), Period::M6)), Some(Date(2020, 08, 29)));
        assert_eq!(rep(Event::from(Date(2020, 03, 31), Period::M6)), Some(Date(2020, 09, 30)));
        assert_eq!(rep(Event::from(Date(2020, 04, 30), Period::M6)), Some(Date(2020, 10, 30)));
    }
    
    #[test]
    fn rep_1Y() {
        assert_eq!(rep(Event::from(Date(2000, 01, 01), Period::Y1)), Some(Date(2001, 01, 01)));
        assert_eq!(rep(Event::from(Date(2019, 02, 28), Period::Y1)), Some(Date(2020, 02, 28)));
        assert_eq!(rep(Event::from(Date(2020, 02, 28), Period::Y1)), Some(Date(2021, 02, 28)));
        assert_eq!(rep(Event::from(Date(2021, 02, 28), Period::Y1)), Some(Date(2022, 02, 28)));
        assert_eq!(rep(Event::from(Date(2019, 02, 28), Period::Y1)), Some(Date(2020, 02, 28)));
        assert_eq!(rep(Event::from(Date(2020, 02, 29), Period::Y1)), Some(Date(2021, 02, 28)));
        assert_eq!(rep(Event::from(Date(2021, 02, 28), Period::Y1)), Some(Date(2022, 02, 28)));
        assert_eq!(rep(Event::from(Date(2019, 06, 30), Period::Y1)), Some(Date(2020, 06, 30)));
        assert_eq!(rep(Event::from(Date(2020, 06, 30), Period::Y1)), Some(Date(2021, 06, 30)));
        assert_eq!(rep(Event::from(Date(2021, 06, 30), Period::Y1)), Some(Date(2022, 06, 30)));
        assert_eq!(rep(Event::from(Date(2019, 08, 31), Period::Y1)), Some(Date(2020, 08, 31)));
        assert_eq!(rep(Event::from(Date(2020, 08, 31), Period::Y1)), Some(Date(2021, 08, 31)));
        assert_eq!(rep(Event::from(Date(2021, 08, 31), Period::Y1)), Some(Date(2022, 08, 31)));
    }
    
    #[test]
    fn rep_2Y() {
        assert_eq!(rep(Event::from(Date(2000, 01, 01), Period::Y2)), Some(Date(2002, 01, 01)));
        assert_eq!(rep(Event::from(Date(2018, 02, 28), Period::Y2)), Some(Date(2020, 02, 28)));
        assert_eq!(rep(Event::from(Date(2019, 02, 28), Period::Y2)), Some(Date(2021, 02, 28)));
        assert_eq!(rep(Event::from(Date(2020, 02, 28), Period::Y2)), Some(Date(2022, 02, 28)));
        assert_eq!(rep(Event::from(Date(2021, 02, 28), Period::Y2)), Some(Date(2023, 02, 28)));
        assert_eq!(rep(Event::from(Date(2018, 02, 28), Period::Y2)), Some(Date(2020, 02, 28)));
        assert_eq!(rep(Event::from(Date(2019, 02, 28), Period::Y2)), Some(Date(2021, 02, 28)));
        assert_eq!(rep(Event::from(Date(2020, 02, 29), Period::Y2)), Some(Date(2022, 02, 28)));
        assert_eq!(rep(Event::from(Date(2021, 02, 28), Period::Y2)), Some(Date(2023, 02, 28)));
        assert_eq!(rep(Event::from(Date(2018, 06, 30), Period::Y2)), Some(Date(2020, 06, 30)));
        assert_eq!(rep(Event::from(Date(2019, 06, 30), Period::Y2)), Some(Date(2021, 06, 30)));
        assert_eq!(rep(Event::from(Date(2020, 06, 30), Period::Y2)), Some(Date(2022, 06, 30)));
        assert_eq!(rep(Event::from(Date(2021, 06, 30), Period::Y2)), Some(Date(2023, 06, 30)));
        assert_eq!(rep(Event::from(Date(2018, 08, 31), Period::Y2)), Some(Date(2020, 08, 31)));
        assert_eq!(rep(Event::from(Date(2019, 08, 31), Period::Y2)), Some(Date(2021, 08, 31)));
        assert_eq!(rep(Event::from(Date(2020, 08, 31), Period::Y2)), Some(Date(2022, 08, 31)));
        assert_eq!(rep(Event::from(Date(2021, 08, 31), Period::Y2)), Some(Date(2023, 08, 31)));
    }
    
    #[test]
    fn rep_none() {
        assert_eq!(rep(Event { dt: Date(2000, 01, 01), freq: None }), None);
    }
    
    #[test]
    fn rep_in_period_1D() {
        assert_eq!(
            rep_in_period(Event { dt: Date(2023, 07, 01), freq: Some(Period::D1) }, Date(2023, 08, 01), Date(2023, 08, 31)),
            vec![
                Date(2023, 08, 01),
                Date(2023, 08, 02),
                Date(2023, 08, 03),
                Date(2023, 08, 04),
                Date(2023, 08, 05),
                Date(2023, 08, 06),
                Date(2023, 08, 07),
                Date(2023, 08, 08),
                Date(2023, 08, 09),
                Date(2023, 08, 10),
                Date(2023, 08, 11),
                Date(2023, 08, 12),
                Date(2023, 08, 13),
                Date(2023, 08, 14),
                Date(2023, 08, 15),
                Date(2023, 08, 16),
                Date(2023, 08, 17),
                Date(2023, 08, 18),
                Date(2023, 08, 19),
                Date(2023, 08, 20),
                Date(2023, 08, 21),
                Date(2023, 08, 22),
                Date(2023, 08, 23),
                Date(2023, 08, 24),
                Date(2023, 08, 25),
                Date(2023, 08, 26),
                Date(2023, 08, 27),
                Date(2023, 08, 28),
                Date(2023, 08, 29),
                Date(2023, 08, 30),
                Date(2023, 08, 31),
            ],
        );
        assert_eq!(
            rep_in_period(Event { dt: Date(2023, 07, 20), freq: Some(Period::D1) }, Date(2023, 07, 01), Date(2023, 07, 31)),
            vec![
                Date(2023, 07, 20),
                Date(2023, 07, 21),
                Date(2023, 07, 22),
                Date(2023, 07, 23),
                Date(2023, 07, 24),
                Date(2023, 07, 25),
                Date(2023, 07, 26),
                Date(2023, 07, 27),
                Date(2023, 07, 28),
                Date(2023, 07, 29),
                Date(2023, 07, 30),
                Date(2023, 07, 31),
            ],
        );
    }
    
    #[test]
    fn rep_in_period_2D() {
        assert_eq!(
            rep_in_period(Event { dt: Date(2023, 07, 01), freq: Some(Period::D2) }, Date(2023, 08, 01), Date(2023, 08, 31)),
            vec![
               Date(2023, 08, 02),
               Date(2023, 08, 04),
               Date(2023, 08, 06),
               Date(2023, 08, 08),
               Date(2023, 08, 10),
               Date(2023, 08, 12),
               Date(2023, 08, 14),
               Date(2023, 08, 16),
               Date(2023, 08, 18),
               Date(2023, 08, 20),
               Date(2023, 08, 22),
               Date(2023, 08, 24),
               Date(2023, 08, 26),
               Date(2023, 08, 28),
               Date(2023, 08, 30),
            ],
        );
        assert_eq!(
            rep_in_period(Event { dt: Date(2023, 07, 20), freq: Some(Period::D2) }, Date(2023, 07, 01), Date(2023, 07, 31)),
            vec![
                Date(2023, 07, 20),
                Date(2023, 07, 22),
                Date(2023, 07, 24),
                Date(2023, 07, 26),
                Date(2023, 07, 28),
                Date(2023, 07, 30)
            ],
        );
    }
    
    #[test]
    fn rep_in_period_1W() {
        assert_eq!(
            rep_in_period(Event { dt: Date(2023, 07, 01), freq: Some(Period::W1) }, Date(2023, 08, 01), Date(2023, 08, 31)),
            vec![
                Date(2023, 08, 05),
                Date(2023, 08, 12),
                Date(2023, 08, 19),
                Date(2023, 08, 26)
            ]
        );
        assert_eq!(
            rep_in_period(Event { dt: Date(2023, 08, 16), freq: Some(Period::W1) }, Date(2023, 08, 01), Date(2023, 08, 31)),
            vec![
                Date(2023, 08, 16),
                Date(2023, 08, 23),
                Date(2023, 08, 30)
            ]
    );
    }
    
    #[test]
    fn rep_in_period_1M() {
        assert_eq!(rep_in_period(Event { dt: Date(2023, 06, 10), freq: Some(Period::M1) }, Date(2023, 08, 01), Date(2023, 08, 31)), [Date(2023, 08, 10)],);
        assert_eq!(rep_in_period(Event { dt: Date(2020, 01, 28), freq: Some(Period::M1) }, Date(2020, 02, 01), Date(2020, 02, 29)), [Date(2020, 02, 28)],);
        assert_eq!(rep_in_period(Event { dt: Date(2020, 01, 29), freq: Some(Period::M1) }, Date(2020, 02, 01), Date(2020, 02, 29)), [Date(2020, 02, 29)],);
        assert_eq!(rep_in_period(Event { dt: Date(2020, 01, 30), freq: Some(Period::M1) }, Date(2020, 02, 01), Date(2020, 02, 29)), [Date(2020, 02, 29)],);
        assert_eq!(rep_in_period(Event { dt: Date(2020, 01, 31), freq: Some(Period::M1) }, Date(2020, 02, 01), Date(2020, 02, 29)), [Date(2020, 02, 29)],);
        assert_eq!(rep_in_period(Event { dt: Date(2023, 08, 10), freq: Some(Period::M1) }, Date(2023, 08, 01), Date(2023, 08, 31)), [Date(2023, 08, 10)],);
    }
    
    #[test]
    fn rep_in_period_3M() {
        assert_eq!(rep_in_period(Event { dt: Date(2020, 01, 28), freq: Some(Period::M3) }, Date(2020, 03, 01), Date(2020, 03, 31)), []);
        assert_eq!(rep_in_period(Event { dt: Date(2020, 01, 28), freq: Some(Period::M3) }, Date(2020, 04, 01), Date(2020, 04, 30)),vec![Date(2020, 04, 28)],);
        assert_eq!(rep_in_period(Event { dt: Date(2020, 01, 29), freq: Some(Period::M3) }, Date(2020, 04, 01), Date(2020, 04, 30)),vec![Date(2020, 04, 29)],);
        assert_eq!(rep_in_period(Event { dt: Date(2020, 01, 30), freq: Some(Period::M3) }, Date(2020, 04, 01), Date(2020, 04, 30)),vec![Date(2020, 04, 30)],);
        assert_eq!(rep_in_period(Event { dt: Date(2020, 01, 31), freq: Some(Period::M3) }, Date(2020, 04, 01), Date(2020, 04, 30)),vec![Date(2020, 04, 30)],);
        assert_eq!(rep_in_period(Event { dt: Date(2020, 04, 10), freq: Some(Period::M3) }, Date(2020, 04, 01), Date(2020, 04, 30)),vec![Date(2020, 04, 10)],);
    }
    
    #[test]
    fn rep_in_period_6M() {
        assert_eq!(rep_in_period(Event { dt: Date(2020, 01, 31), freq: Some(Period::M6) }, Date(2020, 03, 01), Date(2020, 03, 31)), []);
        assert_eq!(rep_in_period(Event { dt: Date(2020, 01, 31), freq: Some(Period::M6) }, Date(2020, 07, 01), Date(2020, 07, 31)),vec![Date(2020, 07, 31)],);
        assert_eq!(rep_in_period(Event { dt: Date(2020, 07, 31), freq: Some(Period::M6) }, Date(2021, 01, 01), Date(2021, 01, 31)),vec![Date(2021, 01, 31)],);
        assert_eq!(rep_in_period(Event { dt: Date(2023, 06, 29), freq: Some(Period::M6) }, Date(2023, 06, 01), Date(2023, 06, 30)),vec![Date(2023, 06, 29)],);
    }
    
    #[test]
    fn rep_in_period_1Y() {
        assert_eq!(rep_in_period(Event { dt: Date(2019, 02, 28), freq: Some(Period::Y1) }, Date(2020, 01, 01), Date(2020, 01, 31)), []);
        assert_eq!(rep_in_period(Event { dt: Date(2019, 02, 28), freq: Some(Period::Y1) }, Date(2025, 02, 01), Date(2025, 02, 28)),vec![Date(2025, 02, 28)],);
        assert_eq!(rep_in_period(Event { dt: Date(2020, 02, 29), freq: Some(Period::Y1) }, Date(2025, 02, 01), Date(2025, 02, 28)),vec![Date(2025, 02, 28)],);
        assert_eq!(rep_in_period(Event { dt: Date(2021, 02, 28), freq: Some(Period::Y1) }, Date(2025, 02, 01), Date(2025, 02, 28)),vec![Date(2025, 02, 28)],);
        assert_eq!(rep_in_period(Event { dt: Date(2022, 02, 28), freq: Some(Period::Y1) }, Date(2025, 02, 01), Date(2025, 02, 28)),vec![Date(2025, 02, 28)],);
        assert_eq!(rep_in_period(Event { dt: Date(2021, 11, 11), freq: Some(Period::Y1) }, Date(2021, 11, 01), Date(2021, 11, 30)),vec![Date(2021, 11, 11)],);
    }
    
    #[test]
    fn rep_in_period_2Y() {
        assert_eq!(rep_in_period(Event { dt: Date(2020, 01, 31), freq: Some(Period::Y2) }, Date(2020, 07, 01), Date(2020, 07, 30)), []);
        assert_eq!(rep_in_period(Event { dt: Date(2020, 01, 31), freq: Some(Period::Y2) }, Date(2022, 01, 01), Date(2022, 01, 31)),vec![Date(2022, 01, 31)],);
        assert_eq!(rep_in_period(Event { dt: Date(2020, 07, 15), freq: Some(Period::Y2) }, Date(2020, 07, 01), Date(2021, 07, 31)),vec![Date(2020, 07, 15)],);
    }
    
    #[test]
    fn rep_in_period_none() {
        assert_eq!(rep_in_period(Event { dt: Date(2000, 01, 01), freq: None }, Date(2023, 08, 01), Date(2023, 08, 31)),vec![]);
        assert_eq!(rep_in_period(Event { dt: Date(2023, 08, 22), freq: None }, Date(2023, 08, 01), Date(2023, 08, 31)),[Date(2023, 08, 22)],);
    }
    
    #[test]
    fn rep_in_period_between_repetition() {
        assert_eq!(rep_in_period(Event { dt: Date(2008, 03, 01), freq: Some(Period::M3) }, Date(2008, 04, 01), Date(2008, 04, 30)), []);
        assert_eq!(rep_in_period(Event { dt: Date(2009, 04, 01), freq: Some(Period::M6) }, Date(2009, 08, 01), Date(2009, 08, 31)), []);
        assert_eq!(rep_in_period(Event { dt: Date(2010, 05, 01), freq: Some(Period::Y1) }, Date(2011, 04, 01), Date(2011, 04, 30)), []);
        assert_eq!(rep_in_period(Event { dt: Date(2011, 06, 01), freq: Some(Period::Y2) }, Date(2012, 06, 01), Date(2012, 06, 30)), []);
    }
    
    #[test]
    fn rep_in_period_before_date() {
        assert_eq!(rep_in_period(Event { dt: Date(2000, 01, 01), freq: Some(Period::D1) }, Date(1999, 12, 01), Date(1999, 12, 31)), []);
        assert_eq!(rep_in_period(Event { dt: Date(2023, 06, 01), freq: Some(Period::D2) }, Date(2023, 05, 01), Date(2023, 05, 31)), []);
        assert_eq!(rep_in_period(Event { dt: Date(2023, 07, 01), freq: Some(Period::W1) }, Date(2023, 06, 01), Date(2023, 06, 30)), []);
        assert_eq!(rep_in_period(Event { dt: Date(2021, 04, 01), freq: Some(Period::M1) }, Date(2021, 03, 01), Date(2021, 03, 31)), []);
        assert_eq!(rep_in_period(Event { dt: Date(2008, 03, 01), freq: Some(Period::M3) }, Date(2008, 02, 01), Date(2008, 02, 29)), []);
        assert_eq!(rep_in_period(Event { dt: Date(2009, 10, 01), freq: Some(Period::M6) }, Date(2009, 09, 01), Date(2009, 09, 30)), []);
        assert_eq!(rep_in_period(Event { dt: Date(2010, 09, 01), freq: Some(Period::Y1) }, Date(2010, 08, 01), Date(2010, 08, 31)), []);
        assert_eq!(rep_in_period(Event { dt: Date(2011, 08, 01), freq: Some(Period::Y2) }, Date(2011, 07, 01), Date(2011, 07, 31)), []);
    }
    
    #[test]
    fn rep_lazy_1d() {
        let it = rep_lazy(Event { dt: Date(2000, 01, 01), freq: Some(Period::D1) });
        assert_eq!(it.next().value, Date(2000, 01, 02));
        assert_eq!(it.next().value, Date(2000, 01, 03));
        assert_eq!(it.next().value, Date(2000, 01, 04));
        assert_eq!(it.next().value, Date(2000, 01, 05));
        assert_eq!(it.next().value, Date(2000, 01, 06));
    }
    
    #[test]
    fn rep_lazy_1d() {
        let it = rep_lazy(Event { dt: Date(2020, 02, 27), freq: Some(Period::D1) });
        assert_eq!(it.next().value, Date(2020, 02, 28));
        assert_eq!(it.next().value, Date(2020, 02, 29));
        assert_eq!(it.next().value, Date(2020, 03, 01));
        assert_eq!(it.next().value, Date(2020, 03, 02));
    }
    
    #[test]
    fn rep_lazy_1d() {
        let it = rep_lazy(Event { dt: Date(2021, 02, 27), freq: Some(Period::D1) });
        assert_eq!(it.next().value, Date(2021, 02, 28));
        assert_eq!(it.next().value, Date(2021, 03, 01));
        assert_eq!(it.next().value, Date(2021, 03, 02));
    }
    
    #[test]
    fn rep_lazy_2d() {
        let it = rep_lazy(Event { dt: Date(2000, 01, 01), freq: Some(Period::D2) });
        assert_eq!(it.next().value, Date(2000, 01, 03));
        assert_eq!(it.next().value, Date(2000, 01, 05));
        assert_eq!(it.next().value, Date(2000, 01, 07));
        assert_eq!(it.next().value, Date(2000, 01, 09));
        assert_eq!(it.next().value, Date(2000, 01, 11));
    }
    
    #[test]
    fn rep_lazy_2d() {
        let it = rep_lazy(Event { dt: Date(2020, 02, 27), freq: Some(Period::D2) });
        assert_eq!(it.next().value, Date(2020, 02, 29));
        assert_eq!(it.next().value, Date(2020, 03, 02));
    }
    
    #[test]
    fn rep_lazy_2d() {
        let it = rep_lazy(Event { dt: Date(2021, 02, 27), freq: Some(Period::D2) });
        assert_eq!(it.next().value, Date(2021, 03, 01));
    }
    
    #[test]
    fn rep_lazy_1w() {
        let it = rep_lazy(Event { dt: Date(2000, 01, 01), freq: Some(Period::W1) });
        assert_eq!(it.next().value, Date(2000, 01, 08));
        assert_eq!(it.next().value, Date(2000, 01, 15));
        assert_eq!(it.next().value, Date(2000, 01, 22));
        assert_eq!(it.next().value, Date(2000, 01, 29));
        assert_eq!(it.next().value, Date(2000, 02, 05));
    }
    
    #[test]
    fn rep_lazy_1w() {
        let it = rep_lazy(Event { dt: Date(2020, 02, 21), freq: Some(Period::W1) });
        assert_eq!(it.next().value, Date(2020, 02, 28));
        assert_eq!(it.next().value, Date(2020, 03, 06));
    }
    
    #[test]
    fn rep_lazy_1w() {
        let it = rep_lazy(Event { dt: Date(2021, 02, 21), freq: Some(Period::W1) });
        assert_eq!(it.next().value, Date(2021, 02, 28));
        assert_eq!(it.next().value, Date(2021, 03, 07));
    }
    
    #[test]
    fn rep_lazy_1m() {
        let it = rep_lazy(Event { dt: Date(2000, 01, 01), freq: Some(Period::M1) });
        assert_eq!(it.next().value, Date(2000, 02, 01));
        assert_eq!(it.next().value, Date(2000, 03, 01));
        assert_eq!(it.next().value, Date(2000, 04, 01));
        assert_eq!(it.next().value, Date(2000, 05, 01));
        assert_eq!(it.next().value, Date(2000, 06, 01));
    }
    
    #[test]
    fn rep_lazy_1m() {
        let it = rep_lazy(Event { dt: Date(2020, 01, 31) , freq: Some(Period::M1) });
        assert_eq!(it.next().value, Date(2020, 02, 29));
        assert_eq!(it.next().value, Date(2020, 03, 31));
    }
    
    #[test]
    fn rep_lazy_1m() {
        let it = rep_lazy(Event { dt: Date(2021, 01, 31) , freq: Some(Period::M1) });
        assert_eq!(it.next().value, Date(2021, 02, 28));
        assert_eq!(it.next().value, Date(2021, 03, 31));
    }
    
    #[test]
    fn rep_lazy_3m() {
        let it = rep_lazy(Event { dt: Date(2000, 01, 01) , freq: Some(Period::M3) });
        assert_eq!(it.next().value, Date(2000, 04, 01));
        assert_eq!(it.next().value, Date(2000, 07, 01));
        assert_eq!(it.next().value, Date(2000, 10, 01));
        assert_eq!(it.next().value, Date(2001, 01, 01));
        assert_eq!(it.next().value, Date(2001, 04, 01));
    }
    
    #[test]
    fn rep_lazy_3m() {
        let it = rep_lazy(Event { dt: Date(2019, 11, 30) , freq: Some(Period::M3) });
        assert_eq!(it.next().value, Date(2020, 02, 29));
        assert_eq!(it.next().value, Date(2020, 05, 30));
        assert_eq!(it.next().value, Date(2020, 08, 30));
        assert_eq!(it.next().value, Date(2020, 11, 30));
    }
    
    #[test]
    fn rep_lazy_6m() {
        let it = rep_lazy(Event { dt: Date(2000, 01, 01) , freq: Some(Period::M6) });
        assert_eq!(it.next().value, Date(2000, 07, 01));
        assert_eq!(it.next().value, Date(2001, 01, 01));
        assert_eq!(it.next().value, Date(2001, 07, 01));
        assert_eq!(it.next().value, Date(2002, 01, 01));
        assert_eq!(it.next().value, Date(2002, 07, 01));
    }
    
    #[test]
    fn rep_lazy_6m() {
        let it = rep_lazy(Event { dt: Date(2019, 08, 31) , freq: Some(Period::M6) });
        assert_eq!(it.next().value, Date(2020, 02, 29));
        assert_eq!(it.next().value, Date(2020, 08, 31));
        assert_eq!(it.next().value, Date(2021, 02, 28));
        assert_eq!(it.next().value, Date(2021, 08, 31));
    }
    
    #[test]
    fn rep_lazy_1y() {
        let it = rep_lazy(Event { dt: Date(2000, 01, 01) , freq: Some(Period::Y1) });
        assert_eq!(it.next().value, Date(2001, 01, 01));
        assert_eq!(it.next().value, Date(2002, 01, 01));
        assert_eq!(it.next().value, Date(2003, 01, 01));
        assert_eq!(it.next().value, Date(2004, 01, 01));
        assert_eq!(it.next().value, Date(2005, 01, 01));
    }
    
    #[test]
    fn rep_lazy_1y() {
        let it = rep_lazy(Event { dt: Date(2020, 02, 29) , freq: Some(Period::Y1) });
        assert_eq!(it.next().value, Date(2021, 02, 28));
        assert_eq!(it.next().value, Date(2022, 02, 28));
        assert_eq!(it.next().value, Date(2023, 02, 28));
        assert_eq!(it.next().value, Date(2024, 02, 29));
    }
    
    #[test]
    fn rep_lazy_2y() {
        let it = rep_lazy(Event { dt: Date(2000, 01, 01) , freq: Some(Period::Y2) });
        assert_eq!(it.next().value, Date(2002, 01, 01));
        assert_eq!(it.next().value, Date(2004, 01, 01));
        assert_eq!(it.next().value, Date(2006, 01, 01));
        assert_eq!(it.next().value, Date(2008, 01, 01));
        assert_eq!(it.next().value, Date(2010, 01, 01));
    }
    
    #[test]
    fn rep_lazy_2y() {
        let it = rep_lazy(Event { dt: Date(2020, 02, 29) , freq: Some(Period::Y2) });
        assert_eq!(it.next().value, Date(2022, 02, 28));
        assert_eq!(it.next().value, Date(2024, 02, 29));
    }
    
    #[test]
    fn rep_lazy_none() {
        let it = rep_lazy(Event { dt: Date(2000, 01, 01) , freq: None });
        assert_eq!(it.next().value, None);
        assert_eq!(it.next().value, None);
        assert_eq!(it.next().value, None);
        assert_eq!(it.next().value, None);
        assert_eq!(it.next().value, None);
    }*/
}
