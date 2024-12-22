use crate::{
    domain::validation::{DtErr, DtMaxErr, DtMinErr, Val},
    infra::validation::Field,
};

pub fn dt(f: &Field) -> Result<(), DtErr> {
    match &f.value {
        Val::Str(str_value) => {
            let parts: Vec<&str> = str_value.split('-').collect();
            if parts.len() != 3 {
                return Err(DtErr(f.name));
            }
            if parts[0].len() != 4 || parts[1].len() != 2 || parts[2].len() != 2 {
                return Err(DtErr(f.name));
            }
            if !parts.iter().all(|part| part.chars().all(|c| c.is_digit(10))) {
                return Err(DtErr(f.name));
            }
            let _yyyy = parts[0].parse::<u16>().map_err(|_| DtErr(f.name))?;
            let _mm = parts[1].parse::<u16>().map_err(|_| DtErr(f.name))?;
            let _dd = parts[2].parse::<u16>().map_err(|_| DtErr(f.name))?;
            return Ok(());
        }
        _ => Ok(()),
    }
}

pub fn dt_min(valid: &String, f: &Field) -> Result<(), DtMinErr> {
    match &f.value {
        Val::Str(str_value) => {
            let valid_parts: Vec<&str> = valid.split('-').collect();
            if valid_parts.len() != 3 {
                return Err(DtMinErr(f.name));
            }
            let valid_yyyy = valid_parts[0].parse::<u16>().map_err(|_| DtMinErr(f.name))?;
            let valid_mm = valid_parts[1].parse::<u16>().map_err(|_| DtMinErr(f.name))?;
            let valid_dd = valid_parts[2].parse::<u16>().map_err(|_| DtMinErr(f.name))?;

            let value_parts: Vec<&str> = str_value.split('-').collect();
            if value_parts.len() != 3 {
                return Err(DtMinErr(f.name));
            }
            let value_yyyy = value_parts[0].parse::<u16>().map_err(|_| DtMinErr(f.name))?;
            let value_mm = value_parts[1].parse::<u16>().map_err(|_| DtMinErr(f.name))?;
            let value_dd = value_parts[2].parse::<u16>().map_err(|_| DtMinErr(f.name))?;

            if value_yyyy < valid_yyyy {
                return Err(DtMinErr(f.name));
            }
            if value_yyyy == valid_yyyy && value_mm < valid_mm {
                return Err(DtMinErr(f.name));
            }
            if value_yyyy == valid_yyyy && value_mm == valid_mm && value_dd < valid_dd {
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
            let valid_parts: Vec<&str> = valid.split('-').collect();
            if valid_parts.len() != 3 {
                return Err(DtMaxErr(f.name));
            }
            let valid_yyyy = valid_parts[0].parse::<u16>().map_err(|_| DtMaxErr(f.name))?;
            let valid_mm = valid_parts[1].parse::<u16>().map_err(|_| DtMaxErr(f.name))?;
            let valid_dd = valid_parts[2].parse::<u16>().map_err(|_| DtMaxErr(f.name))?;

            let value_parts: Vec<&str> = str_value.split('-').collect();
            if value_parts.len() != 3 {
                return Err(DtMaxErr(f.name));
            }
            let value_yyyy = value_parts[0].parse::<u16>().map_err(|_| DtMaxErr(f.name))?;
            let value_mm = value_parts[1].parse::<u16>().map_err(|_| DtMaxErr(f.name))?;
            let value_dd = value_parts[2].parse::<u16>().map_err(|_| DtMaxErr(f.name))?;

            if value_yyyy > valid_yyyy {
                return Err(DtMaxErr(f.name));
            }
            if value_yyyy == valid_yyyy && value_mm > valid_mm {
                return Err(DtMaxErr(f.name));
            }
            if value_yyyy == valid_yyyy && value_mm == valid_mm && value_dd > valid_dd {
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
