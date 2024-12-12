use crate::domain::validation::{DtErr, DtMaxErr, DtMinErr, Value};

pub fn dt(value: &Value) -> Result<(), DtErr> {
    match value {
        Value::Str(str_value) => {
            let parts: Vec<&str> = str_value.split('-').collect();
            if parts.len() != 3 {
                return Err(DtErr);
            }
            if parts[0].len() != 4 || parts[1].len() != 2 || parts[2].len() != 2 {
                return Err(DtErr);
            }
            if !parts.iter().all(|part| part.chars().all(|c| c.is_digit(10))) {
                return Err(DtErr);
            }
            let _yyyy = parts[0].parse::<u16>().map_err(|_| DtErr)?;
            let _mm = parts[1].parse::<u16>().map_err(|_| DtErr)?;
            let _dd = parts[2].parse::<u16>().map_err(|_| DtErr)?;
            return Ok(());
        }
        _ => Ok(()),
    }
}

pub fn dt_min(valid: &String, value: &Value) -> Result<(), DtMinErr> {
    match value {
        Value::Str(str_value) => {
            let valid_parts: Vec<&str> = valid.0.split('-').collect();
            let valid_yyyy = valid_parts[0].parse::<u16>().map_err(|_| DtMinErr)?;
            let valid_mm = valid_parts[1].parse::<u16>().map_err(|_| DtMinErr)?;
            let valid_dd = valid_parts[2].parse::<u16>().map_err(|_| DtMinErr)?;

            let value_parts: Vec<&str> = str_value.split('-').collect();
            let value_yyyy = value_parts[0].parse::<u16>().map_err(|_| DtMinErr)?;
            let value_mm = value_parts[1].parse::<u16>().map_err(|_| DtMinErr)?;
            let value_dd = value_parts[2].parse::<u16>().map_err(|_| DtMinErr)?;

            if value_yyyy < valid_yyyy {
                return Err(DtMinErr);
            }
            if value_yyyy == valid_yyyy && value_mm < valid_mm {
                return Err(DtMinErr);
            }
            if value_yyyy == valid_yyyy && value_mm == valid_mm && value_dd < valid_dd {
                return Err(DtMinErr);
            }
            Ok(())
        }
        _ => Ok(()),
    }
}

pub fn dt_max(valid: &String, value: &Value) -> Result<(), DtMaxErr> {
    match value {
        Value::Str(str_value) => {
            let valid_parts: Vec<&str> = valid.0.split('-').collect();
            let valid_yyyy = valid_parts[0].parse::<u16>().map_err(|_| DtMaxErr)?;
            let valid_mm = valid_parts[1].parse::<u16>().map_err(|_| DtMaxErr)?;
            let valid_dd = valid_parts[2].parse::<u16>().map_err(|_| DtMaxErr)?;

            let value_parts: Vec<&str> = str_value.split('-').collect();
            let value_yyyy = value_parts[0].parse::<u16>().map_err(|_| DtMaxErr)?;
            let value_mm = value_parts[1].parse::<u16>().map_err(|_| DtMaxErr)?;
            let value_dd = value_parts[2].parse::<u16>().map_err(|_| DtMaxErr)?;

            if value_yyyy > valid_yyyy {
                return Err(DtMaxErr);
            }
            if value_yyyy == valid_yyyy && value_mm > valid_mm {
                return Err(DtMaxErr);
            }
            if value_yyyy == valid_yyyy && value_mm == valid_mm && value_dd > valid_dd {
                return Err(DtMaxErr);
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
        assert_eq!(dt(&Value::Absent), Ok(()));
        assert_eq!(dt(&Value::Str(String::from("2026-10-28"))), Ok(()));
    }

    #[test]
    fn test_dt_err() {
        assert_eq!(dt(&Value::Str(String::from("28-10-2026"))), Err(DtErr));
        assert_eq!(dt(&Value::Str(String::from("10-2026-28"))), Err(DtErr));
        assert_eq!(dt(&Value::Str(String::from("26-10-28"))), Err(DtErr));
        assert_eq!(dt(&Value::Str(String::from("026-10-28"))), Err(DtErr));
        assert_eq!(dt(&Value::Str(String::from("2026/10/28"))), Err(DtErr));
        assert_eq!(dt(&Value::Str(String::from("2026 10 28 "))), Err(DtErr));
        assert_eq!(dt(&Value::Str(String::from("20261028"))), Err(DtErr));
    }

    #[test]
    fn test_dt_min_ok() {
        assert_eq!(dt_min(&String::from("2026-10-28"), &Value::Absent), Ok(()));
        assert_eq!(
            dt_min(&String::from("2026-10-28"), &Value::Str(String::from("2026-10-28"))),
            Ok(())
        );
        assert_eq!(
            dt_min(&String::from("2026-10-28"), &Value::Str(String::from("2026-10-29"))),
            Ok(())
        );
        assert_eq!(
            dt_min(&String::from("2026-10-28"), &Value::Str(String::from("2026-11-01"))),
            Ok(())
        );
        assert_eq!(
            dt_min(&String::from("2026-10-28"), &Value::Str(String::from("2027-01-01"))),
            Ok(())
        );
        assert_eq!(
            dt_min(&String::from("2026-10-28"), &Value::Str(String::from("2027-12-31"))),
            Ok(())
        );
    }

    #[test]
    fn test_dt_min_err() {
        assert_eq!(
            dt_min(&String::from("2026-10-28"), &Value::Str(String::from("2026-10-27"))),
            Err(DtMinErr)
        );
        assert_eq!(
            dt_min(&String::from("2026-10-28"), &Value::Str(String::from("2026-09-30"))),
            Err(DtMinErr)
        );
        assert_eq!(
            dt_min(&String::from("2026-10-28"), &Value::Str(String::from("2025-12-31"))),
            Err(DtMinErr)
        );
        assert_eq!(
            dt_min(&String::from("2026-10-28"), &Value::Str(String::from("2025-01-01"))),
            Err(DtMinErr)
        );
    }

    #[test]
    fn test_dt_max_ok() {
        assert_eq!(dt_max(&String::from("2026-10-28"), &Value::Absent), Ok(()));
        assert_eq!(
            dt_max(&String::from("2026-10-28"), &Value::Str(String::from("2026-10-28"))),
            Ok(())
        );
        assert_eq!(
            dt_max(&String::from("2026-10-28"), &Value::Str(String::from("2026-10-27"))),
            Ok(())
        );
        assert_eq!(
            dt_max(&String::from("2026-10-28"), &Value::Str(String::from("2026-09-30"))),
            Ok(())
        );
        assert_eq!(
            dt_max(&String::from("2026-10-28"), &Value::Str(String::from("2025-12-31"))),
            Ok(())
        );
        assert_eq!(
            dt_max(&String::from("2026-10-28"), &Value::Str(String::from("2025-01-01"))),
            Ok(())
        );
    }

    #[test]
    fn test_dt_max_err() {
        assert_eq!(
            dt_max(&String::from("2026-10-28"), &Value::Str(String::from("2026-10-29"))),
            Err(DtMaxErr)
        );
        assert_eq!(
            dt_max(&String::from("2026-10-28"), &Value::Str(String::from("2026-11-01"))),
            Err(DtMaxErr)
        );
        assert_eq!(
            dt_max(&String::from("2026-10-28"), &Value::Str(String::from("2027-01-01"))),
            Err(DtMaxErr)
        );
        assert_eq!(
            dt_max(&String::from("2026-10-28"), &Value::Str(String::from("2027-12-31"))),
            Err(DtMaxErr)
        );
    }
}
