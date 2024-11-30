use crate::date::{
    gregorian::{intv_between, Dt},
    interval::{self},
};

#[derive(Debug, PartialEq, Clone)]
pub enum Freq {
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

#[derive(Debug, PartialEq, Clone)]
pub struct DtEvt {
    pub dt: Dt,
    pub freq: Option<Freq>,
}

impl DtEvt {
    pub fn from(dt: Dt, freq: Freq) -> Self {
        DtEvt { dt, freq: Some(freq) }
    }
}

pub fn closest_rep(evt: DtEvt, dt: Dt) -> Option<Dt> {
    if dt.y.0 < evt.dt.y.0 {
        return None;
    }
    if dt.y == evt.dt.y && dt.m.to_u8() < evt.dt.m.to_u8() {
        return None;
    }
    if dt.y == evt.dt.y && dt.m == evt.dt.m && dt.d.0 < evt.dt.d.0 {
        return None;
    }
    let diff = intv_between(&evt.dt, &dt);
    match evt.freq {
        Some(Freq::D1) => Some(evt.dt + diff.d),
        Some(Freq::D2) => Some(evt.dt + interval::D(diff.d.0 - diff.d.0 % 2)),
        Some(Freq::W1) => Some(evt.dt + diff.w),
        Some(Freq::W2) => Some(evt.dt + interval::W(diff.w.0 - diff.w.0 % 2)),
        Some(Freq::M1) => Some(evt.dt + diff.m),
        Some(Freq::M2) => Some(evt.dt + interval::M(diff.m.0 - diff.m.0 % 2)),
        Some(Freq::M3) => Some(evt.dt + interval::M(diff.m.0 - diff.m.0 % 3)),
        Some(Freq::M4) => Some(evt.dt + interval::M(diff.m.0 - diff.m.0 % 4)),
        Some(Freq::M6) => Some(evt.dt + interval::M(diff.m.0 - diff.m.0 % 6)),
        Some(Freq::Y1) => Some(evt.dt + diff.y),
        Some(Freq::Y2) => Some(evt.dt + interval::Y(diff.y.0 - diff.y.0 % 2)),
        Some(Freq::Y4) => Some(evt.dt + interval::Y(diff.y.0 - diff.y.0 % 4)),
        Some(Freq::Y5) => Some(evt.dt + interval::Y(diff.y.0 - diff.y.0 % 5)),
        Some(Freq::Y6) => Some(evt.dt + interval::Y(diff.y.0 - diff.y.0 % 6)),
        Some(Freq::Y10) => Some(evt.dt + interval::Y(diff.y.0 - diff.y.0 % 10)),
        None => None,
    }
}

pub fn rep(evt: DtEvt, i: u16) -> Option<Dt> {
    match evt.freq {
        Some(Freq::D1) => Some(evt.dt + interval::D(u32::from(1 * i))),
        Some(Freq::D2) => Some(evt.dt + interval::D(u32::from(2 * i))),
        Some(Freq::W1) => Some(evt.dt + interval::W(u32::from(1 * i))),
        Some(Freq::W2) => Some(evt.dt + interval::W(u32::from(2 * i))),
        Some(Freq::M1) => Some(evt.dt + interval::M(1 * i)),
        Some(Freq::M2) => Some(evt.dt + interval::M(2 * i)),
        Some(Freq::M3) => Some(evt.dt + interval::M(3 * i)),
        Some(Freq::M4) => Some(evt.dt + interval::M(4 * i)),
        Some(Freq::M6) => Some(evt.dt + interval::M(6 * i)),
        Some(Freq::Y1) => Some(evt.dt + interval::Y(1 * i)),
        Some(Freq::Y2) => Some(evt.dt + interval::Y(2 * i)),
        Some(Freq::Y4) => Some(evt.dt + interval::Y(4 * i)),
        Some(Freq::Y5) => Some(evt.dt + interval::Y(5 * i)),
        Some(Freq::Y6) => Some(evt.dt + interval::Y(6 * i)),
        Some(Freq::Y10) => Some(evt.dt + interval::Y(10 * i)),
        None => None,
    }
}

pub fn rep_between(evt: DtEvt, begin: Dt, end: Dt) -> Vec<Dt> {
    if begin > end || evt.dt > end {
        return vec![];
    }
    let mut res: Vec<Dt> = vec![];
    let mut curr = Some(Dt::from(evt.dt.y.0, evt.dt.m.to_u8(), evt.dt.d.0));
    if evt.dt < begin {
        curr = closest_rep(evt.clone(), begin);
    }
    let mut i = 0;
    while let Some(local_curr) = curr {
        if local_curr > end {
            break;
        }
        res.push(local_curr);
        i += 1;
        curr = rep(evt.clone(), i);
    }
    return res;
}

#[cfg(test)]
mod test {
    use crate::date::gregorian::{D, M, Y};

    use super::*;
    #[test]
    fn test_event() {
        assert_eq!(DtEvt::from(Dt::from(2024, 11, 22), Freq::M6),
            DtEvt { dt: Dt { y: Y(2024), m: M::Nov, d: D(22) }, freq: Some(Freq::M6) });
    }

    #[test]
    fn test_closest_rep_none() {
        assert_eq!(closest_rep(DtEvt { dt: Dt::from(2000, 01, 01), freq: None }, Dt::from(2023, 08, 01)), None);
    }

    #[test]
    fn test_clorest_rep_before() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Freq::D1), Dt::from(2019, 08, 07)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Freq::D2), Dt::from(2019, 08, 07)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Freq::W1), Dt::from(2019, 08, 07)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Freq::M1), Dt::from(2019, 08, 07)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Freq::M3), Dt::from(2019, 08, 07)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Freq::M6), Dt::from(2019, 08, 07)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Freq::Y1), Dt::from(2019, 08, 07)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Freq::Y2), Dt::from(2019, 08, 07)), None);
    }

    #[test]
    fn test_clorest_rep_same_day() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2020, 08, 08), Freq::D1), Dt::from(2020, 08, 08)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2020, 08, 08), Freq::D2), Dt::from(2020, 08, 08)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2020, 08, 08), Freq::W1), Dt::from(2020, 08, 08)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2020, 08, 08), Freq::M1), Dt::from(2020, 08, 08)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2020, 08, 08), Freq::M3), Dt::from(2020, 08, 08)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2020, 08, 08), Freq::M6), Dt::from(2020, 08, 08)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2020, 08, 08), Freq::Y1), Dt::from(2020, 08, 08)), None);
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2020, 08, 08), Freq::Y2), Dt::from(2020, 08, 08)), None);
    }

    #[test]
    fn test_clorest_rep_exact_day() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Freq::D1), Dt::from(2021, 08, 09)), Some(Dt::from(2021, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Freq::D2), Dt::from(2021, 08, 10)), Some(Dt::from(2021, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Freq::W1), Dt::from(2021, 08, 15)), Some(Dt::from(2021, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Freq::M1), Dt::from(2021, 09, 08)), Some(Dt::from(2021, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Freq::M3), Dt::from(2021, 11, 08)), Some(Dt::from(2021, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Freq::M6), Dt::from(2022, 02, 08)), Some(Dt::from(2021, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Freq::Y1), Dt::from(2022, 08, 08)), Some(Dt::from(2021, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Freq::Y2), Dt::from(2023, 08, 08)), Some(Dt::from(2021, 08, 08)));
    }

    #[test]
    fn test_clorest_rep_next_day() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Freq::D2), Dt::from(2021, 08, 11)), Some(Dt::from(2021, 08, 10)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Freq::W1), Dt::from(2021, 08, 16)), Some(Dt::from(2021, 08, 15)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Freq::M1), Dt::from(2021, 09, 09)), Some(Dt::from(2021, 09, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Freq::M3), Dt::from(2021, 11, 09)), Some(Dt::from(2021, 11, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Freq::M6), Dt::from(2022, 02, 09)), Some(Dt::from(2022, 02, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Freq::Y1), Dt::from(2022, 08, 09)), Some(Dt::from(2022, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2021, 08, 08), Freq::Y2), Dt::from(2023, 08, 09)), Some(Dt::from(2023, 08, 08)));
    }

    #[test]
    fn test_closest_rep_1d() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2000, 01, 01), Freq::D1), Dt::from(2023, 08, 01)), Some(Dt::from(2023, 07, 31)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2000, 01, 01), Freq::D1), Dt::from(2023, 08, 02)), Some(Dt::from(2023, 08, 01)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2000, 01, 01), Freq::D1), Dt::from(2023, 08, 03)), Some(Dt::from(2023, 08, 02)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2000, 01, 01), Freq::D1), Dt::from(2023, 08, 04)), Some(Dt::from(2023, 08, 03)));
    }

    #[test]
    fn test_closest_rep_2d() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2023, 06, 01), Freq::D2), Dt::from(2023, 06, 02)), Some(Dt::from(2023, 06, 01)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2023, 06, 01), Freq::D2), Dt::from(2023, 06, 03)), Some(Dt::from(2023, 06, 01)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2023, 06, 01), Freq::D2), Dt::from(2023, 06, 04)), Some(Dt::from(2023, 06, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2023, 06, 01), Freq::D2), Dt::from(2023, 06, 05)), Some(Dt::from(2023, 06, 03)));
    }

    #[test]
    fn test_closest_rep_1w() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2023, 07, 03), Freq::W1), Dt::from(2023, 07, 09)), Some(Dt::from(2023, 07, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2023, 07, 03), Freq::W1), Dt::from(2023, 07, 10)), Some(Dt::from(2023, 07, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2023, 07, 03), Freq::W1), Dt::from(2023, 07, 11)), Some(Dt::from(2023, 07, 10)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2023, 07, 03), Freq::W1), Dt::from(2023, 07, 12)), Some(Dt::from(2023, 07, 10)));
    }

    #[test]
    fn test_closest_rep_1m() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Freq::M1), Dt::from(2023, 03, 02)), Some(Dt::from(2023, 02, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Freq::M1), Dt::from(2023, 03, 03)), Some(Dt::from(2023, 02, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Freq::M1), Dt::from(2023, 03, 04)), Some(Dt::from(2023, 03, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Freq::M1), Dt::from(2023, 03, 05)), Some(Dt::from(2023, 03, 03)));
    }

    #[test]
    fn test_closest_rep_3m() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Freq::M3), Dt::from(2023, 01, 02)), Some(Dt::from(2022, 10, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Freq::M3), Dt::from(2023, 01, 03)), Some(Dt::from(2023, 10, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Freq::M3), Dt::from(2023, 01, 04)), Some(Dt::from(2023, 01, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Freq::M3), Dt::from(2023, 01, 05)), Some(Dt::from(2023, 01, 03)));
    }

    #[test]
    fn test_closest_rep_6m() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Freq::M6), Dt::from(2023, 07, 02)), Some(Dt::from(2023, 01, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Freq::M6), Dt::from(2023, 07, 03)), Some(Dt::from(2023, 01, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Freq::M6), Dt::from(2023, 07, 04)), Some(Dt::from(2023, 07, 03)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 01, 03), Freq::M6), Dt::from(2023, 07, 05)), Some(Dt::from(2023, 07, 03)));
    }

    #[test]
    fn test_closest_rep_1y() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Freq::Y1), Dt::from(2023, 08, 07)), Some(Dt::from(2022, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Freq::Y1), Dt::from(2023, 08, 08)), Some(Dt::from(2022, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Freq::Y1), Dt::from(2023, 08, 09)), Some(Dt::from(2023, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Freq::Y1), Dt::from(2023, 08, 10)), Some(Dt::from(2023, 08, 08)));
    }

    #[test]
    fn test_closest_rep_2y() {
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Freq::Y2), Dt::from(2023, 08, 07)), Some(Dt::from(2021, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Freq::Y2), Dt::from(2023, 08, 08)), Some(Dt::from(2023, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Freq::Y2), Dt::from(2023, 08, 09)), Some(Dt::from(2023, 08, 08)));
        assert_eq!(closest_rep(DtEvt::from(Dt::from(2019, 08, 08), Freq::Y2), Dt::from(2023, 08, 10)), Some(Dt::from(2023, 08, 08)));
    }

    #[test]
    fn rep_1d() {
        assert_eq!(rep(DtEvt::from(Dt::from(1999, 12, 31), Freq::D1), 1), Some(Dt::from(2000, 01, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 01, 01), Freq::D1), 1), Some(Dt::from(2000, 01, 02)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 28), Freq::D1), 1), Some(Dt::from(2020, 02, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 29), Freq::D1), 1), Some(Dt::from(2020, 03, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 28), Freq::D1), 1), Some(Dt::from(2021, 03, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 03, 01), Freq::D1), 1), Some(Dt::from(2021, 03, 02)));
    }

    #[test]
    fn rep_2d() {
        assert_eq!(rep(DtEvt::from(Dt::from(1999, 12, 31), Freq::D2), 1), Some(Dt::from(2000, 01, 02)));
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 01, 01), Freq::D2), 1), Some(Dt::from(2000, 01, 03)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 27), Freq::D2), 1), Some(Dt::from(2020, 02, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 28), Freq::D2), 1), Some(Dt::from(2020, 03, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 29), Freq::D2), 1), Some(Dt::from(2020, 03, 02)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 27), Freq::D2), 1), Some(Dt::from(2021, 03, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 28), Freq::D2), 1), Some(Dt::from(2021, 03, 02)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 03, 01), Freq::D2), 1), Some(Dt::from(2021, 03, 03)));
    }

    #[test]
    fn rep_1w() {
        assert_eq!(rep(DtEvt::from(Dt::from(1999, 12, 24), Freq::W1), 1), Some(Dt::from(1999, 12, 31)));
        assert_eq!(rep(DtEvt::from(Dt::from(1999, 12, 25), Freq::W1), 1), Some(Dt::from(2000, 01, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 01, 01), Freq::W1), 1), Some(Dt::from(2000, 01, 08)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 21), Freq::W1), 1), Some(Dt::from(2020, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 22), Freq::W1), 1), Some(Dt::from(2020, 02, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 23), Freq::W1), 1), Some(Dt::from(2020, 03, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 24), Freq::W1), 1), Some(Dt::from(2020, 03, 02)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 21), Freq::W1), 1), Some(Dt::from(2021, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 22), Freq::W1), 1), Some(Dt::from(2021, 03, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 23), Freq::W1), 1), Some(Dt::from(2021, 03, 02)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 24), Freq::W1), 1), Some(Dt::from(2021, 03, 03)));
    }

    #[test]
    fn rep_1m() {
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 01, 01), Freq::M1), 1), Some(Dt::from(2000, 02, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 01, 28), Freq::M1), 1), Some(Dt::from(2019, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 01, 29), Freq::M1), 1), Some(Dt::from(2019, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 01, 30), Freq::M1), 1), Some(Dt::from(2019, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 01, 31), Freq::M1), 1), Some(Dt::from(2019, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 01, 28), Freq::M1), 1), Some(Dt::from(2020, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 01, 29), Freq::M1), 1), Some(Dt::from(2020, 02, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 01, 30), Freq::M1), 1), Some(Dt::from(2020, 02, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 01, 31), Freq::M1), 1), Some(Dt::from(2020, 02, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 01, 31), Freq::M1), 1), Some(Dt::from(2020, 02, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 29), Freq::M1), 1), Some(Dt::from(2020, 03, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 03, 31), Freq::M1), 1), Some(Dt::from(2020, 04, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 04, 30), Freq::M1), 1), Some(Dt::from(2020, 05, 30)));
    }

    #[test]
    fn rep_3m() {
        assert_eq!(rep(DtEvt::from(Dt::from(1999, 11, 30), Freq::M3), 1), Some(Dt::from(2000, 02, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 02, 29), Freq::M3), 1), Some(Dt::from(2000, 05, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 05, 29), Freq::M3), 1), Some(Dt::from(2000, 08, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 08, 29), Freq::M3), 1), Some(Dt::from(2000, 11, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 01, 31), Freq::M3), 1), Some(Dt::from(2020, 04, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 29), Freq::M3), 1), Some(Dt::from(2020, 05, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 03, 31), Freq::M3), 1), Some(Dt::from(2020, 06, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 04, 30), Freq::M3), 1), Some(Dt::from(2020, 07, 30)));
    }

    #[test]
    fn rep_6m() {
        assert_eq!(rep(DtEvt::from(Dt::from(1999, 08, 31), Freq::M6), 1), Some(Dt::from(2000, 02, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 02, 29), Freq::M6), 1), Some(Dt::from(2000, 08, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 08, 29), Freq::M6), 1), Some(Dt::from(2001, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2001, 02, 28), Freq::M6), 1), Some(Dt::from(2001, 08, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 01, 31), Freq::M6), 1), Some(Dt::from(2020, 07, 31)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 29), Freq::M6), 1), Some(Dt::from(2020, 08, 29)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 03, 31), Freq::M6), 1), Some(Dt::from(2020, 09, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 04, 30), Freq::M6), 1), Some(Dt::from(2020, 10, 30)));
    }

    #[test]
    fn rep_1y() {
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 01, 01), Freq::Y1), 1), Some(Dt::from(2001, 01, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 02, 28), Freq::Y1), 1), Some(Dt::from(2020, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 28), Freq::Y1), 1), Some(Dt::from(2021, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 28), Freq::Y1), 1), Some(Dt::from(2022, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 02, 28), Freq::Y1), 1), Some(Dt::from(2020, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 29), Freq::Y1), 1), Some(Dt::from(2021, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 28), Freq::Y1), 1), Some(Dt::from(2022, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 06, 30), Freq::Y1), 1), Some(Dt::from(2020, 06, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 06, 30), Freq::Y1), 1), Some(Dt::from(2021, 06, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 06, 30), Freq::Y1), 1), Some(Dt::from(2022, 06, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 08, 31), Freq::Y1), 1), Some(Dt::from(2020, 08, 31)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 08, 31), Freq::Y1), 1), Some(Dt::from(2021, 08, 31)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 08, 31), Freq::Y1), 1), Some(Dt::from(2022, 08, 31)));
    }

    #[test]
    fn rep_2y() {
        assert_eq!(rep(DtEvt::from(Dt::from(2000, 01, 01), Freq::Y2), 1), Some(Dt::from(2002, 01, 01)));
        assert_eq!(rep(DtEvt::from(Dt::from(2018, 02, 28), Freq::Y2), 1), Some(Dt::from(2020, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 02, 28), Freq::Y2), 1), Some(Dt::from(2021, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 28), Freq::Y2), 1), Some(Dt::from(2022, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 28), Freq::Y2), 1), Some(Dt::from(2023, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2018, 02, 28), Freq::Y2), 1), Some(Dt::from(2020, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 02, 28), Freq::Y2), 1), Some(Dt::from(2021, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 02, 29), Freq::Y2), 1), Some(Dt::from(2022, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 02, 28), Freq::Y2), 1), Some(Dt::from(2023, 02, 28)));
        assert_eq!(rep(DtEvt::from(Dt::from(2018, 06, 30), Freq::Y2), 1), Some(Dt::from(2020, 06, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 06, 30), Freq::Y2), 1), Some(Dt::from(2021, 06, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 06, 30), Freq::Y2), 1), Some(Dt::from(2022, 06, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 06, 30), Freq::Y2), 1), Some(Dt::from(2023, 06, 30)));
        assert_eq!(rep(DtEvt::from(Dt::from(2018, 08, 31), Freq::Y2), 1), Some(Dt::from(2020, 08, 31)));
        assert_eq!(rep(DtEvt::from(Dt::from(2019, 08, 31), Freq::Y2), 1), Some(Dt::from(2021, 08, 31)));
        assert_eq!(rep(DtEvt::from(Dt::from(2020, 08, 31), Freq::Y2), 1), Some(Dt::from(2022, 08, 31)));
        assert_eq!(rep(DtEvt::from(Dt::from(2021, 08, 31), Freq::Y2), 1), Some(Dt::from(2023, 08, 31)));
    }

    #[test]
    fn rep_none() {
        assert_eq!(rep(DtEvt { dt: Dt::from(2000, 01, 01), freq: None }, 1), None);
    }

    #[test]
    fn rep_between_1d() {
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2023, 07, 01), Freq::D1),
                Dt::from(2023, 08, 01),
                Dt::from(2023, 08, 31)
            ),
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
            ],);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2023, 07, 20), Freq::D1),
                Dt::from(2023, 07, 01),
                Dt::from(2023, 07, 31)
            ),
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
            ],);
    }

    #[test]
    fn rep_between_2d() {
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2023, 07, 01), Freq::D2),
                Dt::from(2023, 08, 01),
                Dt::from(2023, 08, 31)
            ),
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
            ],);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2023, 07, 20), Freq::D2),
                Dt::from(2023, 07, 01),
                Dt::from(2023, 07, 31)
            ),
            vec![
                Dt::from(2023, 07, 20),
                Dt::from(2023, 07, 22),
                Dt::from(2023, 07, 24),
                Dt::from(2023, 07, 26),
                Dt::from(2023, 07, 28),
                Dt::from(2023, 07, 30)
            ],);
    }

    #[test]
    fn rep_between_1w() {
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2023, 07, 01), Freq::W1),
                Dt::from(2023, 08, 01),
                Dt::from(2023, 08, 31)
            ),
            vec![
                Dt::from(2023, 08, 05),
                Dt::from(2023, 08, 12),
                Dt::from(2023, 08, 19),
                Dt::from(2023, 08, 26)
            ]
        );
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2023, 08, 16), Freq::W1),
                Dt::from(2023, 08, 01),
                Dt::from(2023, 08, 31)
            ),
            vec![Dt::from(2023, 08, 16), Dt::from(2023, 08, 23), Dt::from(2023, 08, 30)]
        );
    }

    #[test]
    fn rep_between_1m() {
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2023, 06, 10), Freq::M1),
                Dt::from(2023, 08, 01),
                Dt::from(2023, 08, 31)
            ),
            [Dt::from(2023, 08, 10)]
        );
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2020, 01, 28), Freq::M1),
                Dt::from(2020, 02, 01),
                Dt::from(2020, 02, 29)
            ),
            [Dt::from(2020, 02, 28)]);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2020, 01, 29), Freq::M1),
                Dt::from(2020, 02, 01),
                Dt::from(2020, 02, 29)
            ),
            [Dt::from(2020, 02, 29)]);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2020, 01, 30), Freq::M1),
                Dt::from(2020, 02, 01),
                Dt::from(2020, 02, 29)
            ),
            [Dt::from(2020, 02, 29)]);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2020, 01, 31), Freq::M1),
                Dt::from(2020, 02, 01),
                Dt::from(2020, 02, 29)
            ),
            [Dt::from(2020, 02, 29)]);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2023, 08, 10), Freq::M1),
                Dt::from(2023, 08, 01),
                Dt::from(2023, 08, 31)
            ),
            [Dt::from(2023, 08, 10)]);
    }

    #[test]
    fn rep_between_3m() {
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2020, 01, 28), Freq::M3),
                Dt::from(2020, 03, 01),
                Dt::from(2020, 03, 31)
            ),
            []);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2020, 01, 28), Freq::M3),
                Dt::from(2020, 04, 01),
                Dt::from(2020, 04, 30)
            ),
            vec![Dt::from(2020, 04, 28)]);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2020, 01, 29), Freq::M3),
                Dt::from(2020, 04, 01),
                Dt::from(2020, 04, 30)
            ),
            vec![Dt::from(2020, 04, 29)]);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2020, 01, 30), Freq::M3),
                Dt::from(2020, 04, 01),
                Dt::from(2020, 04, 30)
            ),
            vec![Dt::from(2020, 04, 30)]);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2020, 01, 31), Freq::M3),
                Dt::from(2020, 04, 01),
                Dt::from(2020, 04, 30)
            ),
            vec![Dt::from(2020, 04, 30)]);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2020, 04, 10), Freq::M3),
                Dt::from(2020, 04, 01),
                Dt::from(2020, 04, 30)
            ),
            vec![Dt::from(2020, 04, 10)]);
    }

    #[test]
    fn rep_between_6m() {
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2020, 01, 31), Freq::M6),
                Dt::from(2020, 03, 01),
                Dt::from(2020, 03, 31)
            ),
            []);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2020, 01, 31), Freq::M6),
                Dt::from(2020, 07, 01),
                Dt::from(2020, 07, 31)
            ),
            vec![Dt::from(2020, 07, 31)]);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2020, 07, 31), Freq::M6),
                Dt::from(2021, 01, 01),
                Dt::from(2021, 01, 31)
            ),
            vec![Dt::from(2021, 01, 31)]);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2023, 06, 29), Freq::M6),
                Dt::from(2023, 06, 01),
                Dt::from(2023, 06, 30)
            ),
            vec![Dt::from(2023, 06, 29)]);
    }

    #[test]
    fn rep_between_1y() {
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2019, 02, 28), Freq::Y1),
                Dt::from(2020, 01, 01),
                Dt::from(2020, 01, 31)
            ),
            []);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2019, 02, 28), Freq::Y1),
                Dt::from(2025, 02, 01),
                Dt::from(2025, 02, 28)
            ),
            vec![Dt::from(2025, 02, 28)]);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2020, 02, 29), Freq::Y1),
                Dt::from(2025, 02, 01),
                Dt::from(2025, 02, 28)
            ),
            vec![Dt::from(2025, 02, 28)]);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2021, 02, 28), Freq::Y1),
                Dt::from(2025, 02, 01),
                Dt::from(2025, 02, 28)
            ),
            vec![Dt::from(2025, 02, 28)]);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2022, 02, 28), Freq::Y1),
                Dt::from(2025, 02, 01),
                Dt::from(2025, 02, 28)
            ),
            vec![Dt::from(2025, 02, 28)]);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2021, 11, 11), Freq::Y1),
                Dt::from(2021, 11, 01),
                Dt::from(2021, 11, 30)
            ),
            vec![Dt::from(2021, 11, 11)]);
    }

    #[test]
    fn rep_between_2y() {
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2020, 01, 31), Freq::Y2),
                Dt::from(2020, 07, 01),
                Dt::from(2020, 07, 30)
            ),
            []);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2020, 01, 31), Freq::Y2),
                Dt::from(2022, 01, 01),
                Dt::from(2022, 01, 31)
            ),
            vec![Dt::from(2022, 01, 31)]);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2020, 07, 15), Freq::Y2),
                Dt::from(2020, 07, 01),
                Dt::from(2021, 07, 31)
            ),
            vec![Dt::from(2020, 07, 15)]);
    }

    #[test]
    fn rep_between_none() {
        assert_eq!(
            rep_between(
                DtEvt { dt: Dt::from(2000, 01, 01), freq: None },
                Dt::from(2023, 08, 01),
                Dt::from(2023, 08, 31)
            ),
            vec![]);
        assert_eq!(
            rep_between(
                DtEvt { dt: Dt::from(2023, 08, 22), freq: None },
                Dt::from(2023, 08, 01),
                Dt::from(2023, 08, 31)
            ),
            [Dt::from(2023, 08, 22)]);
    }

    #[test]
    fn rep_between_between_repetition() {
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2008, 03, 01), Freq::M3),
                Dt::from(2008, 04, 01),
                Dt::from(2008, 04, 30)
            ),
            []);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2009, 04, 01), Freq::M6),
                Dt::from(2009, 08, 01),
                Dt::from(2009, 08, 31)
            ),
            []);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2010, 05, 01), Freq::Y1),
                Dt::from(2011, 04, 01),
                Dt::from(2011, 04, 30)
            ),
            []);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2011, 06, 01), Freq::Y2),
                Dt::from(2012, 06, 01),
                Dt::from(2012, 06, 30)
            ),
            []);
    }

    #[test]
    fn rep_between_before_date() {
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2000, 01, 01), Freq::D1),
                Dt::from(1999, 12, 01),
                Dt::from(1999, 12, 31)
            ),
            []);
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2023, 06, 01), Freq::D2),
                Dt::from(2023, 05, 01),
                Dt::from(2023, 05, 31)
            ),
            []
        );
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2023, 07, 01), Freq::W1),
                Dt::from(2023, 06, 01),
                Dt::from(2023, 06, 30)
            ),
            []
        );
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2021, 04, 01), Freq::M1),
                Dt::from(2021, 03, 01),
                Dt::from(2021, 03, 31)
            ),
            []
        );
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2008, 03, 01), Freq::M3),
                Dt::from(2008, 02, 01),
                Dt::from(2008, 02, 29)
            ),
            []
        );
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2009, 10, 01), Freq::M6),
                Dt::from(2009, 09, 01),
                Dt::from(2009, 09, 30)
            ),
            []
        );
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2010, 09, 01), Freq::Y1),
                Dt::from(2010, 08, 01),
                Dt::from(2010, 08, 31)
            ),
            []
        );
        assert_eq!(
            rep_between(
                DtEvt::from(Dt::from(2011, 08, 01), Freq::Y2),
                Dt::from(2011, 07, 01),
                Dt::from(2011, 07, 31)
            ),
            []
        );
    }
}
