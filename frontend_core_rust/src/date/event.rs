use crate::date::{gregorian::Dt, interval};

use super::interval::{DayIntv, MonthIntv, WeekIntv, YearIntv, DtIntv};

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
pub struct DtEvt {
    pub dt: Dt,
    pub freq: Option<Period>,
}

impl DtEvt {
    pub fn from(dt: Dt, freq: Period) -> Self {
        DtEvt { dt, freq: Some(freq) }
    }
}

// pub fn closest_rep(evt: DtEvt, dt: Dt) -> Option<Dt> {
//     if  dt.y < evt.dt.y {
//         return None
//     }
//     if dt.y == evt.dt.y && dt.m < evt.dt.m {
//         return None
//     }
//     if dt.y == evt.dt.y && dt.m == evt.dt.m && dt.d < evt.dt.d {
//         return None
//     }
//     let diff = interval_between(evt.dt, dt);
//     match evt.freq {
//         Some(Period::D1) => evt.dt + diff.d,
//         Some(Period::D2) => evt.dt + diff.d - diff.d % 2,
//         Some(Period::W1) => evt.dt + diff.w,
//         Some(Period::W2) => evt.dt + diff.w - diff.w % 2,
//         Some(Period::M1) => evt.dt + diff.m,
//         Some(Period::M2) => evt.dt + diff.m - diff.m % 2,
//         Some(Period::M3) => evt.dt + diff.m - diff.m % 3,
//         Some(Period::M4) => evt.dt + diff.m - diff.m % 4,
//         Some(Period::M6) => evt.dt + diff.m - diff.m % 6,
//         Some(Period::Y1) => evt.dt + diff.y + diff.y,
//         Some(Period::Y2) => evt.dt + diff.y - diff.y % 2,
//         Some(Period::Y4) => evt.dt + diff.y - diff.y % 4,
//         Some(Period::Y5) => evt.dt + diff.y - diff.y % 5,
//         Some(Period::Y6) => evt.dt + diff.y - diff.y % 6,
//         Some(Period::Y10) => evt.dt + diff.y - diff.y % 10,
//         None => None
//     }
// }

pub fn rep(evt: DtEvt, i: u16) -> Option<Dt> {
    match evt.freq {
        Some(Period::D1) => Some(evt.dt + DayIntv(u32::from(1 * i))),
        Some(Period::D2) => Some(evt.dt + DayIntv(u32::from(2 * i ))),
        Some(Period::W1) => Some(evt.dt + WeekIntv(u32::from( 1 * i ))),
        Some(Period::W2) => Some(evt.dt + WeekIntv(u32::from( 2 * i ))),
        Some(Period::M1) => Some(evt.dt + MonthIntv( 1 * i )),
        Some(Period::M2) => Some(evt.dt + MonthIntv( 2 * i )),
        Some(Period::M3) => Some(evt.dt + MonthIntv( 3 * i )),
        Some(Period::M4) => Some(evt.dt + MonthIntv( 4 * i )),
        Some(Period::M6) => Some(evt.dt + MonthIntv( 6 * i)),
        Some(Period::Y1) => Some(evt.dt + YearIntv( 1 * i)),
        Some(Period::Y2) => Some(evt.dt + YearIntv( 2 * i)),
        Some(Period::Y4) => Some(evt.dt + YearIntv( 4 * i)),
        Some(Period::Y5) => Some(evt.dt + YearIntv( 5 * i)),
        Some(Period::Y6) => Some(evt.dt + YearIntv( 6 * i)),
        Some(Period::Y10) => Some(evt.dt + YearIntv( 10 * i)),
        None => None
    }
}

// pub fn rep_between(evt: DtEvt, begin: Dt, end: Dt) -> Vec<Dt> {
//     if begin > end {
//         return vec![];
//     }
//     if evt.dt > end {
//         return vec![];
//     }
//     let mut res: Vec<Dt> = vec![];
//     let mut curr: Option<Dt> = None;
//     if evt.dt > begin {
//         curr = Some(evt.dt);
//     } else {
//         curr = closest_rep(evt, begin);
//     }
// 
//     let mut i = 0;
//     while let Some(curr) = curr {
//         res.push(curr);
//         i+= 1;
//         curr = rep(evt, i);
//     }
// 
//     return res;
// }


#[cfg(test)]
mod test {
    use crate::date::gregorian::{DtDay, DtMonth, DtYear};

    use super::*;
    #[test]
    fn test_event() {
        assert_eq!(
            DtEvt::from(Dt::from(2024, 11, 22), Period::M6),
            DtEvt {
                dt: Dt { y: DtYear(2024), m: DtMonth::Nov, d: DtDay(22) },
                freq: Some(Period::M6)
            }
        );
    }
/*
    #[test]
    fn test_closest_rep_none() {
        assert_eq!(closest_rep(DtEvt { dt: Dt::from(2000, 01, 01), freq: None }, Dt::from(2023, 08, 01)), None);
    }

    #[test]
    fn test_clorest_rep_before() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Period::D1), Dt::from(2019, 08, 07)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Period::D2), Dt::from(2019, 08, 07)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Period::W1), Dt::from(2019, 08, 07)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Period::M1), Dt::from(2019, 08, 07)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Period::M3), Dt::from(2019, 08, 07)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Period::M6), Dt::from(2019, 08, 07)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Period::Y1), Dt::from(2019, 08, 07)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Period::Y2), Dt::from(2019, 08, 07)), None);
    }

    #[test]
    fn test_clorest_rep_same_day() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2020, 08, 08), Period::D1), Dt::from(2020, 08, 08)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2020, 08, 08), Period::D2), Dt::from(2020, 08, 08)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2020, 08, 08), Period::W1), Dt::from(2020, 08, 08)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2020, 08, 08), Period::M1), Dt::from(2020, 08, 08)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2020, 08, 08), Period::M3), Dt::from(2020, 08, 08)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2020, 08, 08), Period::M6), Dt::from(2020, 08, 08)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2020, 08, 08), Period::Y1), Dt::from(2020, 08, 08)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2020, 08, 08), Period::Y2), Dt::from(2020, 08, 08)), None);
    }

    #[test]
    fn test_clorest_rep_exact_day() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Period::D1), Dt::from(2021, 08, 09)), Some(Dt::from(2021, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Period::D2), Dt::from(2021, 08, 10)), Some(Dt::from(2021, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Period::W1), Dt::from(2021, 08, 15)), Some(Dt::from(2021, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Period::M1), Dt::from(2021, 09, 08)), Some(Dt::from(2021, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Period::M3), Dt::from(2021, 11, 08)), Some(Dt::from(2021, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Period::M6), Dt::from(2022, 02, 08)), Some(Dt::from(2021, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Period::Y1), Dt::from(2022, 08, 08)), Some(Dt::from(2021, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Period::Y2), Dt::from(2023, 08, 08)), Some(Dt::from(2021, 08, 08)));
    }

    #[test]
    fn test_clorest_rep_next_day() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Period::D2), Dt::from(2021, 08, 11)), Some(Dt::from(2021, 08, 10)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Period::W1), Dt::from(2021, 08, 16)), Some(Dt::from(2021, 08, 15)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Period::M1), Dt::from(2021, 09, 09)), Some(Dt::from(2021, 09, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Period::M3), Dt::from(2021, 11, 09)), Some(Dt::from(2021, 11, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Period::M6), Dt::from(2022, 02, 09)), Some(Dt::from(2022, 02, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Period::Y1), Dt::from(2022, 08, 09)), Some(Dt::from(2022, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Period::Y2), Dt::from(2023, 08, 09)), Some(Dt::from(2023, 08, 08)));
    }

    #[test]
    fn test_closest_rep_1d() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2000, 01, 01), Period::D1), Dt::from(2023, 08, 01)), Some(Dt::from(2023, 07, 31)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2000, 01, 01), Period::D1), Dt::from(2023, 08, 02)), Some(Dt::from(2023, 08, 01)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2000, 01, 01), Period::D1), Dt::from(2023, 08, 03)), Some(Dt::from(2023, 08, 02)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2000, 01, 01), Period::D1), Dt::from(2023, 08, 04)), Some(Dt::from(2023, 08, 03)));
    }

    #[test]
    fn test_closest_rep_2d() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2023, 06, 01), Period::D2), Dt::from(2023, 06, 02)), Some(Dt::from(2023, 06, 01)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2023, 06, 01), Period::D2), Dt::from(2023, 06, 03)), Some(Dt::from(2023, 06, 01)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2023, 06, 01), Period::D2), Dt::from(2023, 06, 04)), Some(Dt::from(2023, 06, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2023, 06, 01), Period::D2), Dt::from(2023, 06, 05)), Some(Dt::from(2023, 06, 03)));
    }

    #[test]
    fn test_closest_rep_1w() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2023, 07, 03), Period::W1), Dt::from(2023, 07, 09)), Some(Dt::from(2023, 07, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2023, 07, 03), Period::W1), Dt::from(2023, 07, 10)), Some(Dt::from(2023, 07, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2023, 07, 03), Period::W1), Dt::from(2023, 07, 11)), Some(Dt::from(2023, 07, 10)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2023, 07, 03), Period::W1), Dt::from(2023, 07, 12)), Some(Dt::from(2023, 07, 10)));
    }

    #[test]
    fn test_closest_rep_1m() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Period::M1), Dt::from(2023, 03, 02)), Some(Dt::from(2023, 02, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Period::M1), Dt::from(2023, 03, 03)), Some(Dt::from(2023, 02, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Period::M1), Dt::from(2023, 03, 04)), Some(Dt::from(2023, 03, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Period::M1), Dt::from(2023, 03, 05)), Some(Dt::from(2023, 03, 03)));
    }

    #[test]
    fn test_closest_rep_3m() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Period::M3), Dt::from(2023, 01, 02)), Some(Dt::from(2022, 10, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Period::M3), Dt::from(2023, 01, 03)), Some(Dt::from(2023, 10, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Period::M3), Dt::from(2023, 01, 04)), Some(Dt::from(2023, 01, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Period::M3), Dt::from(2023, 01, 05)), Some(Dt::from(2023, 01, 03)));
    }

    #[test]
    fn test_closest_rep_6m() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Period::M6), Dt::from(2023, 07, 02)), Some(Dt::from(2023, 01, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Period::M6), Dt::from(2023, 07, 03)), Some(Dt::from(2023, 01, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Period::M6), Dt::from(2023, 07, 04)), Some(Dt::from(2023, 07, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Period::M6), Dt::from(2023, 07, 05)), Some(Dt::from(2023, 07, 03)));
    }

    #[test]
    fn test_closest_rep_1y() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Period::Y1), Dt::from(2023, 08, 07)), Some(Dt::from(2022, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Period::Y1), Dt::from(2023, 08, 08)), Some(Dt::from(2022, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Period::Y1), Dt::from(2023, 08, 09)), Some(Dt::from(2023, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Period::Y1), Dt::from(2023, 08, 10)), Some(Dt::from(2023, 08, 08)));
    }

    #[test]
    fn test_closest_rep_2y() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Period::Y2), Dt::from(2023, 08, 07)), Some(Dt::from(2021, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Period::Y2), Dt::from(2023, 08, 08)), Some(Dt::from(2023, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Period::Y2), Dt::from(2023, 08, 09)), Some(Dt::from(2023, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Period::Y2), Dt::from(2023, 08, 10)), Some(Dt::from(2023, 08, 08)));
    }
*/
    #[test]
    fn rep_1d() {
        assert_eq!(rep(DtEvt::from(Dt::from(1999, 12, 31), Period::D1), 1), Some(Dt::from(2000, 01, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 01, 01), Period::D1), 1), Some(Dt::from(2000, 01, 02)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 28), Period::D1), 1), Some(Dt::from(2020, 02, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 29), Period::D1), 1), Some(Dt::from(2020, 03, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 28), Period::D1), 1), Some(Dt::from(2021, 03, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 03, 01), Period::D1), 1), Some(Dt::from(2021, 03, 02)));
    }

    #[test]
    fn rep_2d() {
        assert_eq!(rep(DtEvt::from(Dt::from(1999, 12, 31), Period::D2), 1), Some(Dt::from(2000, 01, 02)));
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 01, 01), Period::D2), 1), Some(Dt::from(2000, 01, 03)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 27), Period::D2), 1), Some(Dt::from(2020, 02, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 28), Period::D2), 1), Some(Dt::from(2020, 03, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 29), Period::D2), 1), Some(Dt::from(2020, 03, 02)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 27), Period::D2), 1), Some(Dt::from(2021, 03, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 28), Period::D2), 1), Some(Dt::from(2021, 03, 02)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 03, 01), Period::D2), 1), Some(Dt::from(2021, 03, 03)));
    }

    #[test]
    fn rep_1w() {
        assert_eq!(rep(DtEvt::from(Dt::from(1999, 12, 24), Period::W1), 1), Some(Dt::from(1999, 12, 31)));
        assert_eq!(rep(DtEvt::from(Dt::from(1999, 12, 25), Period::W1), 1), Some(Dt::from(2000, 01, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 01, 01), Period::W1), 1), Some(Dt::from(2000, 01, 08)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 21), Period::W1), 1), Some(Dt::from(2020, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 22), Period::W1), 1), Some(Dt::from(2020, 02, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 23), Period::W1), 1), Some(Dt::from(2020, 03, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 24), Period::W1), 1), Some(Dt::from(2020, 03, 02)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 21), Period::W1), 1), Some(Dt::from(2021, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 22), Period::W1), 1), Some(Dt::from(2021, 03, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 23), Period::W1), 1), Some(Dt::from(2021, 03, 02)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 24), Period::W1), 1), Some(Dt::from(2021, 03, 03)));
    }

    #[test]
    fn rep_1m() {
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 01, 01), Period::M1), 1), Some(Dt::from(2000, 02, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 01, 28), Period::M1), 1), Some(Dt::from(2019, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 01, 29), Period::M1), 1), Some(Dt::from(2019, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 01, 30), Period::M1), 1), Some(Dt::from(2019, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 01, 31), Period::M1), 1), Some(Dt::from(2019, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 01, 28), Period::M1), 1), Some(Dt::from(2020, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 01, 29), Period::M1), 1), Some(Dt::from(2020, 02, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 01, 30), Period::M1), 1), Some(Dt::from(2020, 02, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 01, 31), Period::M1), 1), Some(Dt::from(2020, 02, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 01, 31), Period::M1), 1), Some(Dt::from(2020, 02, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 29), Period::M1), 1), Some(Dt::from(2020, 03, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 03, 31), Period::M1), 1), Some(Dt::from(2020, 04, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 04, 30), Period::M1), 1), Some(Dt::from(2020, 05, 30)));
    }

    #[test]
    fn rep_3m() {
        assert_eq!(rep(DtEvt::from(Dt::from(1999, 11, 30), Period::M3), 1), Some(Dt::from(2000, 02, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 02, 29), Period::M3), 1), Some(Dt::from(2000, 05, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 05, 29), Period::M3), 1), Some(Dt::from(2000, 08, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 08, 29), Period::M3), 1), Some(Dt::from(2000, 11, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 01, 31), Period::M3), 1), Some(Dt::from(2020, 04, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 29), Period::M3), 1), Some(Dt::from(2020, 05, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 03, 31), Period::M3), 1), Some(Dt::from(2020, 06, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 04, 30), Period::M3), 1), Some(Dt::from(2020, 07, 30)));
    }

    #[test]
    fn rep_6m() {
        assert_eq!(rep(DtEvt::from(Dt::from(1999, 08, 31), Period::M6), 1), Some(Dt::from(2000, 02, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 02, 29), Period::M6), 1), Some(Dt::from(2000, 08, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 08, 29), Period::M6), 1), Some(Dt::from(2001, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2001, 02, 28), Period::M6), 1), Some(Dt::from(2001, 08, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 01, 31), Period::M6), 1), Some(Dt::from(2020, 07, 31)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 29), Period::M6), 1), Some(Dt::from(2020, 08, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 03, 31), Period::M6), 1), Some(Dt::from(2020, 09, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 04, 30), Period::M6), 1), Some(Dt::from(2020, 10, 30)));
    }

    #[test]
    fn rep_1y() {
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 01, 01), Period::Y1), 1), Some(Dt::from(2001, 01, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 02, 28), Period::Y1), 1), Some(Dt::from(2020, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 28), Period::Y1), 1), Some(Dt::from(2021, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 28), Period::Y1), 1), Some(Dt::from(2022, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 02, 28), Period::Y1), 1), Some(Dt::from(2020, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 29), Period::Y1), 1), Some(Dt::from(2021, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 28), Period::Y1), 1), Some(Dt::from(2022, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 06, 30), Period::Y1), 1), Some(Dt::from(2020, 06, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 06, 30), Period::Y1), 1), Some(Dt::from(2021, 06, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 06, 30), Period::Y1), 1), Some(Dt::from(2022, 06, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 08, 31), Period::Y1), 1), Some(Dt::from(2020, 08, 31)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 08, 31), Period::Y1), 1), Some(Dt::from(2021, 08, 31)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 08, 31), Period::Y1), 1), Some(Dt::from(2022, 08, 31)));
    }

    #[test]
    fn rep_2y() {
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 01, 01), Period::Y2), 1), Some(Dt::from(2002, 01, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2018, 02, 28), Period::Y2), 1), Some(Dt::from(2020, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 02, 28), Period::Y2), 1), Some(Dt::from(2021, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 28), Period::Y2), 1), Some(Dt::from(2022, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 28), Period::Y2), 1), Some(Dt::from(2023, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2018, 02, 28), Period::Y2), 1), Some(Dt::from(2020, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 02, 28), Period::Y2), 1), Some(Dt::from(2021, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 29), Period::Y2), 1), Some(Dt::from(2022, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 28), Period::Y2), 1), Some(Dt::from(2023, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2018, 06, 30), Period::Y2), 1), Some(Dt::from(2020, 06, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 06, 30), Period::Y2), 1), Some(Dt::from(2021, 06, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 06, 30), Period::Y2), 1), Some(Dt::from(2022, 06, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 06, 30), Period::Y2), 1), Some(Dt::from(2023, 06, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2018, 08, 31), Period::Y2), 1), Some(Dt::from(2020, 08, 31)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 08, 31), Period::Y2), 1), Some(Dt::from(2021, 08, 31)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 08, 31), Period::Y2), 1), Some(Dt::from(2022, 08, 31)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 08, 31), Period::Y2), 1), Some(Dt::from(2023, 08, 31)));
    }

    #[test]
    fn rep_none() {
        assert_eq!(rep(DtEvt { dt: Dt::from(2000, 01, 01), freq: None }, 1), None);
    }

/* 
#[test]
    fn rep_between_1d() {
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2023, 07, 01), Period::D1), Dt::from(2023, 08, 01), Dt::from(2023, 08, 31)),
            vec![
                Dt::from(2023, 08, 01),
                Dt::from(2023, 08, 02),
                Dt::from(2023, 08, 03),
                Dt::from(2023, 08, 04),
                Dt::from(2023, 08, 05),
                Dt::from(2023, 08, 06),
                Dt::from(2023, 08, 07),
                Dt::from(2023, 08, 08),
                Dt::from(2023, 08, 09),
                Dt::from(2023, 08, 10),
                Dt::from(2023, 08, 11),
                Dt::from(2023, 08, 12),
                Dt::from(2023, 08, 13),
                Dt::from(2023, 08, 14),
                Dt::from(2023, 08, 15),
                Dt::from(2023, 08, 16),
                Dt::from(2023, 08, 17),
                Dt::from(2023, 08, 18),
                Dt::from(2023, 08, 19),
                Dt::from(2023, 08, 20),
                Dt::from(2023, 08, 21),
                Dt::from(2023, 08, 22),
                Dt::from(2023, 08, 23),
                Dt::from(2023, 08, 24),
                Dt::from(2023, 08, 25),
                Dt::from(2023, 08, 26),
                Dt::from(2023, 08, 27),
                Dt::from(2023, 08, 28),
                Dt::from(2023, 08, 29),
                Dt::from(2023, 08, 30),
                Dt::from(2023, 08, 31),
            ],
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2023, 07, 20), Period::D1), Dt::from(2023, 07, 01), Dt::from(2023, 07, 31)),
            vec![
                Dt::from(2023, 07, 20),
                Dt::from(2023, 07, 21),
                Dt::from(2023, 07, 22),
                Dt::from(2023, 07, 23),
                Dt::from(2023, 07, 24),
                Dt::from(2023, 07, 25),
                Dt::from(2023, 07, 26),
                Dt::from(2023, 07, 27),
                Dt::from(2023, 07, 28),
                Dt::from(2023, 07, 29),
                Dt::from(2023, 07, 30),
                Dt::from(2023, 07, 31),
            ],
        );
    }

    #[test]
    fn rep_between_2d() {
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2023, 07, 01), Period::D2), Dt::from(2023, 08, 01), Dt::from(2023, 08, 31)),
            vec![
               Dt::from(2023, 08, 02),
               Dt::from(2023, 08, 04),
               Dt::from(2023, 08, 06),
               Dt::from(2023, 08, 08),
               Dt::from(2023, 08, 10),
               Dt::from(2023, 08, 12),
               Dt::from(2023, 08, 14),
               Dt::from(2023, 08, 16),
               Dt::from(2023, 08, 18),
               Dt::from(2023, 08, 20),
               Dt::from(2023, 08, 22),
               Dt::from(2023, 08, 24),
               Dt::from(2023, 08, 26),
               Dt::from(2023, 08, 28),
               Dt::from(2023, 08, 30),
            ],
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2023, 07, 20), Period::D2), Dt::from(2023, 07, 01), Dt::from(2023, 07, 31)),
            vec![
                Dt::from(2023, 07, 20),
                Dt::from(2023, 07, 22),
                Dt::from(2023, 07, 24),
                Dt::from(2023, 07, 26),
                Dt::from(2023, 07, 28),
                Dt::from(2023, 07, 30)
            ],
        );
    }

    #[test]
    fn rep_between_1w() {
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2023, 07, 01), Period::W1), Dt::from(2023, 08, 01), Dt::from(2023, 08, 31)),
            vec![
                Dt::from(2023, 08, 05),
                Dt::from(2023, 08, 12),
                Dt::from(2023, 08, 19),
                Dt::from(2023, 08, 26)
            ]
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2023, 08, 16), Period::W1), Dt::from(2023, 08, 01), Dt::from(2023, 08, 31)),
            vec![Dt::from(2023, 08, 16), Dt::from(2023, 08, 23), Dt::from(2023, 08, 30)]
        );
    }

    #[test]
    fn rep_between_1m() {
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2023, 06, 10), Period::M1), Dt::from(2023, 08, 01), Dt::from(2023, 08, 31)),
            [Dt::from(2023, 08, 10)]
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2020, 01, 28), Period::M1), Dt::from(2020, 02, 01), Dt::from(2020, 02, 29)),
            [Dt::from(2020, 02, 28)]
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2020, 01, 29), Period::M1), Dt::from(2020, 02, 01), Dt::from(2020, 02, 29)),
            [Dt::from(2020, 02, 29)]
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2020, 01, 30), Period::M1), Dt::from(2020, 02, 01), Dt::from(2020, 02, 29)),
            [Dt::from(2020, 02, 29)]
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2020, 01, 31), Period::M1), Dt::from(2020, 02, 01), Dt::from(2020, 02, 29)),
            [Dt::from(2020, 02, 29)]
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2023, 08, 10), Period::M1), Dt::from(2023, 08, 01), Dt::from(2023, 08, 31)),
            [Dt::from(2023, 08, 10)]
        );
    }

    #[test]
    fn rep_between_3m() {
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2020, 01, 28), Period::M3), Dt::from(2020, 03, 01), Dt::from(2020, 03, 31)),
            []
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2020, 01, 28), Period::M3), Dt::from(2020, 04, 01), Dt::from(2020, 04, 30)),
            vec![Dt::from(2020, 04, 28)]
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2020, 01, 29), Period::M3), Dt::from(2020, 04, 01), Dt::from(2020, 04, 30)),
            vec![Dt::from(2020, 04, 29)]
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2020, 01, 30), Period::M3), Dt::from(2020, 04, 01), Dt::from(2020, 04, 30)),
            vec![Dt::from(2020, 04, 30)]
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2020, 01, 31), Period::M3), Dt::from(2020, 04, 01), Dt::from(2020, 04, 30)),
            vec![Dt::from(2020, 04, 30)]
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2020, 04, 10), Period::M3), Dt::from(2020, 04, 01), Dt::from(2020, 04, 30)),
            vec![Dt::from(2020, 04, 10)]
        );
    }

    #[test]
    fn rep_between_6m() {
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2020, 01, 31), Period::M6), Dt::from(2020, 03, 01), Dt::from(2020, 03, 31)),
            []
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2020, 01, 31), Period::M6), Dt::from(2020, 07, 01), Dt::from(2020, 07, 31)),
            vec![Dt::from(2020, 07, 31)]
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2020, 07, 31), Period::M6), Dt::from(2021, 01, 01), Dt::from(2021, 01, 31)),
            vec![Dt::from(2021, 01, 31)]
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2023, 06, 29), Period::M6), Dt::from(2023, 06, 01), Dt::from(2023, 06, 30)),
            vec![Dt::from(2023, 06, 29)]
        );
    }

    #[test]
    fn rep_between_1y() {
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2019, 02, 28), Period::Y1), Dt::from(2020, 01, 01), Dt::from(2020, 01, 31)),
            []
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2019, 02, 28), Period::Y1), Dt::from(2025, 02, 01), Dt::from(2025, 02, 28)),
            vec![Dt::from(2025, 02, 28)]
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2020, 02, 29), Period::Y1), Dt::from(2025, 02, 01), Dt::from(2025, 02, 28)),
            vec![Dt::from(2025, 02, 28)]
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2021, 02, 28), Period::Y1), Dt::from(2025, 02, 01), Dt::from(2025, 02, 28)),
            vec![Dt::from(2025, 02, 28)]
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2022, 02, 28), Period::Y1), Dt::from(2025, 02, 01), Dt::from(2025, 02, 28)),
            vec![Dt::from(2025, 02, 28)]
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2021, 11, 11), Period::Y1), Dt::from(2021, 11, 01), Dt::from(2021, 11, 30)),
            vec![Dt::from(2021, 11, 11)]
        );
    }

    #[test]
    fn rep_between_2y() {
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2020, 01, 31), Period::Y2), Dt::from(2020, 07, 01), Dt::from(2020, 07, 30)),
            []
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2020, 01, 31), Period::Y2), Dt::from(2022, 01, 01), Dt::from(2022, 01, 31)),
            vec![Dt::from(2022, 01, 31)]
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2020, 07, 15), Period::Y2), Dt::from(2020, 07, 01), Dt::from(2021, 07, 31)),
            vec![Dt::from(2020, 07, 15)]
        );
    }

    #[test]
    fn rep_between_none() {
        assert_eq!(
            rep_between(DtEvt { dt: Dt::from(2000, 01, 01),freq:  None}, Dt::from(2023, 08, 01), Dt::from(2023, 08, 31)),
            vec![]
        );
        assert_eq!(
            rep_between(DtEvt { dt: Dt::from(2023, 08, 22),freq:  None}, Dt::from(2023, 08, 01), Dt::from(2023, 08, 31)),
            [Dt::from(2023, 08, 22)]
        );
    }

    #[test]
    fn rep_between_between_repetition() {
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2008, 03, 01), Period::M3), Dt::from(2008, 04, 01), Dt::from(2008, 04, 30)),
            []
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2009, 04, 01), Period::M6), Dt::from(2009, 08, 01), Dt::from(2009, 08, 31)),
            []
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2010, 05, 01), Period::Y1), Dt::from(2011, 04, 01), Dt::from(2011, 04, 30)),
            []
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2011, 06, 01), Period::Y2), Dt::from(2012, 06, 01), Dt::from(2012, 06, 30)),
            []
        );
    }

    #[test]
    fn rep_between_before_date() {
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2000, 01, 01), Period::D1), Dt::from(1999, 12, 01), Dt::from(1999, 12, 31)),
            []
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2023, 06, 01), Period::D2), Dt::from(2023, 05, 01), Dt::from(2023, 05, 31)),
            []
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2023, 07, 01), Period::W1), Dt::from(2023, 06, 01), Dt::from(2023, 06, 30)),
            []
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2021, 04, 01), Period::M1), Dt::from(2021, 03, 01), Dt::from(2021, 03, 31)),
            []
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2008, 03, 01), Period::M3), Dt::from(2008, 02, 01), Dt::from(2008, 02, 29)),
            []
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2009, 10, 01), Period::M6), Dt::from(2009, 09, 01), Dt::from(2009, 09, 30)),
            []
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2010, 09, 01), Period::Y1), Dt::from(2010, 08, 01), Dt::from(2010, 08, 31)),
            []
        );
        assert_eq!(
            rep_between(DtEvt::from(Dt::from(2011, 08, 01), Period::Y2), Dt::from(2011, 07, 01), Dt::from(2011, 07, 31)),
            []
        );
    }
*/
}
