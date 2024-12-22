use crate::{
    domain::validation::{
        NumFExactErr, NumFMaxErr, NumFMinErr, NumIExactErr, NumIMaxErr, NumIMinErr, NumUExactErr,
        NumUMaxErr, NumUMinErr, Val,
    },
    infra::validation::Field,
};

pub fn num_u_exact(valid: u64, f: &Field) -> Result<(), NumUExactErr> {
    match f.value {
        Val::NumU(num_u) => {
            if num_u == valid {
                Ok(())
            } else {
                Err(NumUExactErr(f.name))
            }
        }
        _ => Ok(()),
    }
}

pub fn num_i_exact(valid: i64, f: &Field) -> Result<(), NumIExactErr> {
    match f.value {
        Val::NumI(num_i) => {
            if num_i == valid {
                Ok(())
            } else {
                Err(NumIExactErr(f.name))
            }
        }
        _ => Ok(()),
    }
}

pub fn num_f_exact(valid: f64, f: &Field) -> Result<(), NumFExactErr> {
    match f.value {
        Val::NumF(num_f) => {
            if num_f == valid {
                Ok(())
            } else {
                Err(NumFExactErr(f.name))
            }
        }
        _ => Ok(()),
    }
}

pub fn num_u_min(valid: u64, f: &Field) -> Result<(), NumUMinErr> {
    match f.value {
        Val::NumU(num_u) => {
            if num_u >= valid {
                Ok(())
            } else {
                Err(NumUMinErr(f.name))
            }
        }
        _ => Ok(()),
    }
}

pub fn num_i_min(valid: i64, f: &Field) -> Result<(), NumIMinErr> {
    match f.value {
        Val::NumI(num_i) => {
            if num_i >= valid {
                Ok(())
            } else {
                Err(NumIMinErr(f.name))
            }
        }
        _ => Ok(()),
    }
}

pub fn num_f_min(valid: f64, f: &Field) -> Result<(), NumFMinErr> {
    match f.value {
        Val::NumF(num_f) => {
            if num_f >= valid {
                Ok(())
            } else {
                Err(NumFMinErr(f.name))
            }
        }
        _ => Ok(()),
    }
}

pub fn num_u_max(valid: u64, f: &Field) -> Result<(), NumUMaxErr> {
    match f.value {
        Val::NumU(num_u) => {
            if num_u <= valid {
                Ok(())
            } else {
                Err(NumUMaxErr(f.name))
            }
        }
        _ => Ok(()),
    }
}

pub fn num_i_max(valid: i64, f: &Field) -> Result<(), NumIMaxErr> {
    match f.value {
        Val::NumI(num_i) => {
            if num_i <= valid {
                Ok(())
            } else {
                Err(NumIMaxErr(f.name))
            }
        }
        _ => Ok(()),
    }
}

pub fn num_f_max(valid: f64, f: &Field) -> Result<(), NumFMaxErr> {
    match f.value {
        Val::NumF(num_f) => {
            if num_f <= valid {
                Ok(())
            } else {
                Err(NumFMaxErr(f.name))
            }
        }
        _ => Ok(()),
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_num_u_exact_ok() {
        assert_eq!(num_u_exact(42, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_u_exact(42, &Field::of(Val::NumU(42))), Ok(()));
        assert_eq!(num_u_exact(22, &Field::of(Val::NumU(22))), Ok(()));
    }

    #[test]
    fn test_num_u_exact_err() {
        assert_eq!(num_u_exact(10, &Field::of(Val::NumU(11))), Err(NumUExactErr("foo")));
        assert_eq!(num_u_exact(10, &Field::of(Val::NumU(9))), Err(NumUExactErr("foo")));
    }

    #[test]
    fn test_num_u_min_ok() {
        assert_eq!(num_u_min(42, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_u_min(42, &Field::of(Val::NumU(42))), Ok(()));
        assert_eq!(num_u_min(42, &Field::of(Val::NumU(43))), Ok(()));
        assert_eq!(num_u_min(42, &Field::of(Val::NumU(100))), Ok(()));
    }

    #[test]
    fn test_num_u_min_err() {
        assert_eq!(num_u_min(10, &Field::of(Val::NumU(9))), Err(NumUMinErr("foo")));
        assert_eq!(num_u_min(10, &Field::of(Val::NumU(8))), Err(NumUMinErr("foo")));
    }

    #[test]
    fn test_num_u_max_ok() {
        assert_eq!(num_u_max(22, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_u_max(22, &Field::of(Val::NumU(22))), Ok(()));
        assert_eq!(num_u_max(22, &Field::of(Val::NumU(21))), Ok(()));
        assert_eq!(num_u_max(22, &Field::of(Val::NumU(0))), Ok(()));
    }

    #[test]
    fn test_num_u_max_err() {
        assert_eq!(num_u_max(10, &Field::of(Val::NumU(11))), Err(NumUMaxErr("foo")));
        assert_eq!(num_u_max(10, &Field::of(Val::NumU(12))), Err(NumUMaxErr("foo")));
    }

    #[test]
    fn test_num_i_exact_ok() {
        assert_eq!(num_i_exact(42, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_i_exact(42, &Field::of(Val::NumI(42))), Ok(()));
        assert_eq!(num_i_exact(-42, &Field::of(Val::NumI(-42))), Ok(()));
    }

    #[test]
    fn test_num_i_exact_err() {
        assert_eq!(num_i_exact(-10, &Field::of(Val::NumI(-11))), Err(NumIExactErr("foo")));
        assert_eq!(num_i_exact(-10, &Field::of(Val::NumI(-9))), Err(NumIExactErr("foo")));
    }

    #[test]
    fn test_num_i_min_ok() {
        assert_eq!(num_i_min(-42, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_i_min(-42, &Field::of(Val::NumI(-42))), Ok(()));
        assert_eq!(num_i_min(-42, &Field::of(Val::NumI(-41))), Ok(()));
        assert_eq!(num_i_min(-42, &Field::of(Val::NumI(22))), Ok(()));
    }

    #[test]
    fn test_num_i_min_err() {
        assert_eq!(num_i_min(-10, &Field::of(Val::NumI(-11))), Err(NumIMinErr("foo")));
        assert_eq!(num_i_min(-10, &Field::of(Val::NumI(-12))), Err(NumIMinErr("foo")));
    }

    #[test]
    fn test_num_i_max_ok() {
        assert_eq!(num_i_max(22, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_i_max(22, &Field::of(Val::NumI(22))), Ok(()));
        assert_eq!(num_i_max(22, &Field::of(Val::NumI(21))), Ok(()));
        assert_eq!(num_i_max(22, &Field::of(Val::NumI(-1943))), Ok(()));
    }

    #[test]
    fn test_num_i_max_err() {
        assert_eq!(num_i_max(10, &Field::of(Val::NumI(11))), Err(NumIMaxErr("foo")));
        assert_eq!(num_i_max(10, &Field::of(Val::NumI(12))), Err(NumIMaxErr("foo")));
    }

    #[test]
    fn test_num_f_exact_ok() {
        assert_eq!(num_f_exact(-42.0, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_f_exact(-42.5, &Field::of(Val::NumF(-42.5))), Ok(()));
        assert_eq!(num_f_exact(42.5, &Field::of(Val::NumF(42.5))), Ok(()));
    }

    #[test]
    fn test_num_f_exact_err() {
        assert_eq!(num_f_exact(-10.0, &Field::of(Val::NumF(-10.1))), Err(NumFExactErr("foo")));
        assert_eq!(num_f_exact(-10.0, &Field::of(Val::NumF(-9.9))), Err(NumFExactErr("foo")));
    }

    #[test]
    fn test_num_f_min_ok() {
        assert_eq!(num_f_min(-42.0, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_f_min(-42.0, &Field::of(Val::NumF(-42.0))), Ok(()));
        assert_eq!(num_f_min(-42.0, &Field::of(Val::NumF(-41.9))), Ok(()));
        assert_eq!(num_f_min(-42.0, &Field::of(Val::NumF(-41.0))), Ok(()));
        assert_eq!(num_f_min(-42.0, &Field::of(Val::NumF(22.0))), Ok(()));
    }

    #[test]
    fn test_num_f_min_err() {
        assert_eq!(num_f_min(-10.0, &Field::of(Val::NumF(-11.0))), Err(NumFMinErr("foo")));
        assert_eq!(num_f_min(-10.0, &Field::of(Val::NumF(-12.0))), Err(NumFMinErr("foo")));
    }

    #[test]
    fn test_num_f_max_ok() {
        assert_eq!(num_f_max(22.0, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_f_max(22.0, &Field::of(Val::NumF(22.0))), Ok(()));
        assert_eq!(num_f_max(22.0, &Field::of(Val::NumF(21.9))), Ok(()));
        assert_eq!(num_f_max(22.0, &Field::of(Val::NumF(21.0))), Ok(()));
        assert_eq!(num_f_max(22.0, &Field::of(Val::NumF(-1943.0))), Ok(()));
    }

    #[test]
    fn test_num_f_max_err() {
        assert_eq!(num_f_max(10.0, &Field::of(Val::NumF(11.0))), Err(NumFMaxErr("foo")));
        assert_eq!(num_f_max(10.0, &Field::of(Val::NumF(12.0))), Err(NumFMaxErr("foo")));
    }
}
