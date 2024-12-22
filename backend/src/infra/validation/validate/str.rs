use crate::{
    domain::validation::{
        StrExactErr, StrExactLenErr, StrMaxLenErr, StrMinLenErr, StrMinLowerErr, StrMinNumErr,
        StrMinSpecialErr, StrMinUpperErr, Val,
    },
    infra::validation::Field,
};

pub fn str_exact(valid: &String, f: &Field) -> Result<(), StrExactErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value == valid {
                Ok(())
            } else {
                Err(StrExactErr(f.name))
            }
        }
        _ => Ok(()),
    }
}

pub fn str_exact_len(valid: u32, f: &Field) -> Result<(), StrExactLenErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().count() as u32 == valid {
                Ok(())
            } else {
                Err(StrExactLenErr(f.name))
            }
        }
        _ => Ok(()),
    }
}

pub fn str_min_len(valid: u32, f: &Field) -> Result<(), StrMinLenErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().count() as u32 >= valid {
                Ok(())
            } else {
                Err(StrMinLenErr(f.name))
            }
        }
        _ => Ok(()),
    }
}

pub fn str_max_len(valid: u32, f: &Field) -> Result<(), StrMaxLenErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().count() as u32 <= valid {
                Ok(())
            } else {
                Err(StrMaxLenErr(f.name))
            }
        }
        _ => Ok(()),
    }
}

pub fn str_min_upper(valid: u32, f: &Field) -> Result<(), StrMinUpperErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_alphabetic() && c.is_uppercase()).count() as u32
                >= valid
            {
                Ok(())
            } else {
                Err(StrMinUpperErr(f.name))
            }
        }
        _ => Ok(()),
    }
}

pub fn str_min_lower(valid: u32, f: &Field) -> Result<(), StrMinLowerErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_alphabetic() && c.is_lowercase()).count() as u32
                >= valid
            {
                Ok(())
            } else {
                Err(StrMinLowerErr(f.name))
            }
        }
        _ => Ok(()),
    }
}

pub fn str_min_num(valid: u32, f: &Field) -> Result<(), StrMinNumErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_ascii_digit()).count() as u32 >= valid {
                Ok(())
            } else {
                Err(StrMinNumErr(f.name))
            }
        }
        _ => Ok(()),
    }
}

pub fn str_min_special(valid: u32, f: &Field) -> Result<(), StrMinSpecialErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_ascii_punctuation()).count() as u32 >= valid {
                Ok(())
            } else {
                Err(StrMinSpecialErr(f.name))
            }
        }
        _ => Ok(()),
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_str_exact_ok() {
        assert_eq!(str_exact(&String::from("Ai"), &Field::of(Val::None)), Ok(()));
        assert_eq!(str_exact(&String::from("Ai"), &Field::of(Val::Str(String::from("Ai")))), Ok(()));
    }

    #[test]
    fn test_str_exact_err() {
        assert_eq!(str_exact(&String::from("TO BE"), &Field::of(Val::Str(String::from("to be")))), Err(StrExactErr("foo")));
    }

    #[test]
    fn test_str_exact_len_ok() {
        assert_eq!(str_exact_len(10, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_exact_len(2, &Field::of(Val::Str(String::from("so")))), Ok(()));
        assert_eq!(str_exact_len(4, &Field::of(Val::Str(String::from("long")))), Ok(()));
        assert_eq!(str_exact_len(3, &Field::of(Val::Str(String::from("and")))), Ok(()));
        assert_eq!(str_exact_len(6, &Field::of(Val::Str(String::from("thanks")))), Ok(()));
    }

    #[test]
    fn test_str_exact_len_err() {
        assert_eq!(str_exact_len(6, &Field::of(Val::Str(String::from("touch")))), Err(StrExactLenErr("foo")));
        assert_eq!(str_exact_len(6, &Field::of(Val::Str(String::from("the sky")))), Err(StrExactLenErr("foo")));
    }

    #[test]
    fn test_str_min_len_ok() {
        assert_eq!(str_min_len(10, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_min_len(10, &Field::of(Val::Str(String::from("Hitchhiker")))), Ok(()));
        assert_eq!(str_min_len(10, &Field::of(Val::Str(String::from("Guide to the galaxy")))), Ok(()));
    }

    #[test]
    fn test_str_min_len_err() {
        assert_eq!(str_min_len(10, &Field::of(Val::Str(String::from("Nevermore")))), Err(StrMinLenErr("foo")));
        assert_eq!(str_min_len(10, &Field::of(Val::Str(String::from("Nevermor")))), Err(StrMinLenErr("foo")));
    }

    #[test]
    fn test_str_max_len_ok() {
        assert_eq!(str_max_len(10, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_max_len(10, &Field::of(Val::Str(String::from("restaurant")))), Ok(()));
        assert_eq!(str_max_len(10, &Field::of(Val::Str(String::from("at the end")))), Ok(()));
        assert_eq!(str_max_len(10, &Field::of(Val::Str(String::from("of the")))), Ok(()));
        assert_eq!(str_max_len(10, &Field::of(Val::Str(String::from("universe")))), Ok(()));
    }

    #[test]
    fn test_str_max_len_err() {
        assert_eq!(str_max_len(10, &Field::of(Val::Str(String::from("there is a ")))), Err(StrMaxLenErr("foo")));
        assert_eq!(str_max_len(10, &Field::of(Val::Str(String::from("light that n")))), Err(StrMaxLenErr("foo")));
    }

    #[test]
    fn test_str_min_upper_ok() {
        assert_eq!(str_min_upper(1, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_min_upper(1, &Field::of(Val::Str(String::from("John")))), Ok(()));
        assert_eq!(str_min_upper(2, &Field::of(Val::Str(String::from("JoHn")))), Ok(()));
        assert_eq!(str_min_upper(3, &Field::of(Val::Str(String::from("JoHN")))), Ok(()));
        assert_eq!(str_min_upper(4, &Field::of(Val::Str(String::from("JOHN")))), Ok(()));
    }

    #[test]
    fn test_str_min_upper_err() {
        assert_eq!(str_min_upper(4, &Field::of(Val::Str(String::from("JOHn")))), Err(StrMinUpperErr("foo")));
        assert_eq!(str_min_upper(4, &Field::of(Val::Str(String::from("JOhn")))), Err(StrMinUpperErr("foo")));
    }

    #[test]
    fn test_str_min_lower_ok() {
        assert_eq!(str_min_lower(1, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_min_lower(1, &Field::of(Val::Str(String::from("PAUl")))), Ok(()));
        assert_eq!(str_min_lower(2, &Field::of(Val::Str(String::from("PAul")))), Ok(()));
        assert_eq!(str_min_lower(3, &Field::of(Val::Str(String::from("Paul")))), Ok(()));
        assert_eq!(str_min_lower(4, &Field::of(Val::Str(String::from("paul")))), Ok(()));
    }

    #[test]
    fn test_str_min_lower_err() {
        assert_eq!(str_min_lower(4, &Field::of(Val::Str(String::from("PaUL")))), Err(StrMinLowerErr("foo")));
        assert_eq!(str_min_lower(4, &Field::of(Val::Str(String::from("PauL")))), Err(StrMinLowerErr("foo")));
    }

    #[test]
    fn test_str_min_num_ok() {
        assert_eq!(str_min_num(1, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_min_num(1, &Field::of(Val::Str(String::from("1")))), Ok(()));
        assert_eq!(str_min_num(2, &Field::of(Val::Str(String::from("10")))), Ok(()));
        assert_eq!(str_min_num(3, &Field::of(Val::Str(String::from("we are 1 3 8")))), Ok(()));
    }

    #[test]
    fn test_str_min_num_err() {
        assert_eq!(str_min_num(3, &Field::of(Val::Str(String::from("we are one 3 8")))), Err(StrMinNumErr("foo")));
        assert_eq!(str_min_num(3, &Field::of(Val::Str(String::from("we are one thirty 8")))), Err(StrMinNumErr("foo")));
    }

    #[test]
    fn test_str_min_special_ok() {
        assert_eq!(str_min_special(1, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_min_special(1, &Field::of(Val::Str(String::from(":")))), Ok(()));
        assert_eq!(str_min_special(2, &Field::of(Val::Str(String::from(":~")))), Ok(()));
        assert_eq!(str_min_special(10, &Field::of(Val::Str(String::from("!@#$%&*()+-")))), Ok(()));
    }

    #[test]
    fn test_str_min_special_err() {
        assert_eq!(str_min_special(10, &Field::of(Val::Str(String::from("!@#$%¨&*(")))), Err(StrMinSpecialErr("foo")));
        assert_eq!(str_min_special(10, &Field::of(Val::Str(String::from("pressure")))), Err(StrMinSpecialErr("foo")));
    }
}
