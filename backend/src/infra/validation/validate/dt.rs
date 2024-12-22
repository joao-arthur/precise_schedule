use regex::Regex;

use crate::{
    domain::validation::{DtErr, DtMaxErr, DtMinErr, Val},
    infra::validation::Field,
};

struct InternalDT(pub u16, pub u16, pub u16);

fn parsedt(s: &String) -> Result<InternalDT, ()> {
    let re = Regex::new(r"^(\[0-9]{4})-(\[0-9]{2})-(\[0-9]{2})$").unwrap();
    if let Some(caps) = re.captures(s) {
        let _yyyy = caps[1].parse::<u16>().map_err(|_| ())?;
        let _mm = caps[2].parse::<u16>().map_err(|_| ())?;
        let _dd = caps[3].parse::<u16>().map_err(|_| ())?;
        return Ok(InternalDT(_yyyy, _mm, _dd));
    } else {
        return Err(());
    }
} 

pub fn dt(f: &Field) -> Result<(), DtErr> {
    match &f.value {
        Val::Str(str_value) => {
            match parsedt(str_value) {
               Err(_) => Err(DtErr(f.name)),
               Ok(_) => Ok(())
            }
        }
        _ => Ok(()),
    }
}

pub fn dt_min(valid: &String, f: &Field) -> Result<(), DtMinErr> {
    match &f.value {
        Val::Str(str_value) => {
            let valid_dt = parsedt(valid).map_err(|_| DtMinErr(f.name))?;
            let value_dt = parsedt(str_value).map_err(|_| DtMinErr(f.name))?;

            if value_dt.0 < valid_dt.0 {
                return Err(DtMinErr(f.name));
            }
            if value_dt.0 == valid_dt.0 && value_dt.1 < valid_dt.1 {
                return Err(DtMinErr(f.name));
            }
            if value_dt.0 == valid_dt.0 && value_dt.1 == valid_dt.1 && value_dt.2 < valid_dt.2 {
                return Err(DtMinErr(f.name));
            }
            Ok(())
        }
        _ => Ok(()),
    }
}

pub fn dt_max(valid: &String, f: &Field) -> Result<(), DtMaxErr> {
    match &f.value {
        Val::Str(str_value) => {
            let valid_dt = parsedt(valid).map_err(|_| DtMaxErr(f.name))?;
            let value_dt = parsedt(str_value).map_err(|_| DtMaxErr(f.name))?;

            if value_dt.0 > valid_dt.0 {
                return Err(DtMaxErr(f.name));
            }
            if value_dt.0 == valid_dt.0 && value_dt.1 > valid_dt.1 {
                return Err(DtMaxErr(f.name));
            }
            if value_dt.0 == valid_dt.0 && value_dt.1 == valid_dt.1 && value_dt.2 > valid_dt.2 {
                return Err(DtMaxErr(f.name));
            }
            Ok(())
        }
        _ => Ok(()),
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_dt_ok() {
        assert_eq!(dt(&Field::of(Val::None)), Ok(()));
        assert_eq!(dt(&Field::of(Val::Str(String::from("2026-10-28")))), Ok(()));
    }

    #[test]
    fn test_dt_err() {
        assert_eq!(dt(&Field::of(Val::Str(String::from("28-10-2026")))), Err(DtErr("foo")));
        assert_eq!(dt(&Field::of(Val::Str(String::from("28-102026")))), Err(DtErr("foo")));
        assert_eq!(dt(&Field::of(Val::Str(String::from("2810-2026")))), Err(DtErr("foo")));
        assert_eq!(dt(&Field::of(Val::Str(String::from("10-2026-28")))), Err(DtErr("foo")));
        assert_eq!(dt(&Field::of(Val::Str(String::from("26-10-28")))), Err(DtErr("foo")));
        assert_eq!(dt(&Field::of(Val::Str(String::from("026-10-28")))), Err(DtErr("foo")));
        assert_eq!(dt(&Field::of(Val::Str(String::from("2026/10/28")))), Err(DtErr("foo")));
        assert_eq!(dt(&Field::of(Val::Str(String::from("2026 10 28 ")))), Err(DtErr("foo")));
        assert_eq!(dt(&Field::of(Val::Str(String::from("20261028")))), Err(DtErr("foo")));
    }

    #[test]
    fn test_dt_min_ok() {
        assert_eq!(dt_min(&String::from("2026-10-28"), &Field::of(Val::None)), Ok(()));
        assert_eq!(dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-10-28")))), Ok(()));
        assert_eq!(dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-10-29")))), Ok(()));
        assert_eq!(dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-11-01")))), Ok(()));
        assert_eq!(dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2027-01-01")))), Ok(()));
        assert_eq!(dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2027-12-31")))), Ok(()));
    }

    #[test]
    fn test_dt_min_err() {
        assert_eq!(dt_min(&String::from("2026-1028"), &Field::of(Val::Str(String::from("2026-1027")))), Err(DtMinErr("foo")));
        assert_eq!(dt_min(&String::from("202610-28"), &Field::of(Val::Str(String::from("202610-27")))), Err(DtMinErr("foo")));

        assert_eq!(dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-10-27")))), Err(DtMinErr("foo")));
        assert_eq!(dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-09-30")))), Err(DtMinErr("foo")));
        assert_eq!(dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2025-12-31")))), Err(DtMinErr("foo")));
        assert_eq!(dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2025-01-01")))), Err(DtMinErr("foo")));
    }

    #[test]
    fn test_dt_max_ok() {
        assert_eq!(dt_max(&String::from("2026-10-28"), &Field::of(Val::None)), Ok(()));
        assert_eq!(dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-10-28")))), Ok(()));
        assert_eq!(dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-10-27")))), Ok(()));
        assert_eq!(dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-09-30")))), Ok(()));
        assert_eq!(dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2025-12-31")))), Ok(()));
        assert_eq!(dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2025-01-01")))), Ok(()));
    }

    #[test]
    fn test_dt_max_err() {
        assert_eq!(dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-10-29")))), Err(DtMaxErr("foo")));
        assert_eq!(dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-11-01")))), Err(DtMaxErr("foo")));
        assert_eq!(dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2027-01-01")))), Err(DtMaxErr("foo")));
        assert_eq!(dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2027-12-31")))), Err(DtMaxErr("foo")));
    }
}
